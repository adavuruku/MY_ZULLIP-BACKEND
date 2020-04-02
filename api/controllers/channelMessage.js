const mongoose = require('mongoose');
const ChannelsMessage = require('../models/channelMessage');
const ChannelMessageReaction = require('../models/channelMessageReaction');
const url = require('url')
exports.users_add_message = (req,res,next)=>{
    const message = new ChannelsMessage({
        _id : mongoose.Types.ObjectId(),
        messageContent :req.body.messageContent,
        userInformation : req.userData.userId,
        channelInfo : req.body.channelId
    });
    message.save()
    .then(doc=>{
        // res.status(201).json({
        //     message:'created',
        //     message:doc
        // });
        res.redirect(url.format({
            pathname:'/messageChannel',
            query:{
                channelid:doc.channelInfo.toString(),
                messageid:doc._id.toString()
            }
        }))
    }).catch(err=>{
        res.status(500).json({
            message: 'faill',
            Error: err
        });
    });          
}

exports.users_view_channel_message = (req,res,next)=>{
    const channelid = req.params.channelid
    console.log(channelid)
    ChannelsMessage.find({channelInfo:channelid}).sort('-createdAt')
    .populate('userInformation')
    .populate('channelInfo')
    .exec()
    .then(message=>{
        if(message.length > 0){
            const response={
                count: message.length,
                channelId: message[0].channelInfo._id,
                channelName: message[0].channelInfo.channelName,
                allMessage: message.map(channel=>{
                    return {
                        messageId: channel._id,
                        messageContent: channel.messageContent,
                        isThread: channel.channelMessageConversation,
                        postedBy: {
                            fullName:channel.userInformation.fullName,
                            profileImage:channel.userInformation.profileImage
                        },
                        createdAt:channel.createdAt,
                        channelMessageReaction: channel.channelMessageReaction
                    }
                })
            };
            res.status(200).json(response);
        }else{
            res.status(200).json({message: 'No Message'});
        }
    }).catch(err=> {
        console.log(err)
        res.status(500).json({error:err});
    });
}
// const asyncRec = require('async')     
// const ChannelMessageConversation = require('../models/channelMessageConversation');
// exports.users_view_channel_message = async (req,res,next)=>{
//     const channelid = req.params.channelid
//     console.log(channelid)
//     await ChannelsMessage.find({channelInfo:channelid}).sort('-createdAt')
//     .populate('userInformation','fullName')
//     .populate('channelInfo')
//     .exec()
//     .then(message=>{
//         if(message.length > 0){
//             response={
//                 count: message.length,
//                 channelId: message[0].channelInfo._id,
//                 channelName: message[0].channelInfo.channelName,
//                 allMessage:  ()=>  {(message.map(channel=>{
//                     if (channel.channelMessageConversation == true){
//                         ChannelMessageConversation.find({channelInfo:channel._id}).sort('-createdAt')
//                         .populate('userInformation')
//                         .exec()
//                         .then(conversation=>{
//                             const responseTwo={};
//                             if (conversation.length>0){
//                                 responseTwo['conversation']=conversation
//                             }
//                             return {
//                                 messageId: channel._id,
//                                 messageContent: channel.messageContent,
//                                 isThread: channel.channelMessageConversation,
//                                 channelMessageReaction: channel.channelMessageReaction,
//                                 postedBy: channel.userInformation.fullName,
//                                 createdAt:channel.createdAt,
//                                 conversationMessage :responseTwo
                                
//                             }
//                         })
//                     }else{
//                         return {
//                             messageId: channel._id,
//                             messageContent: channel.messageContent,
//                             isThread: channel.channelMessageConversation,
//                             channelMessageReaction: channel.channelMessageReaction,
//                             postedBy: channel.userInformation.fullName,
//                             createdAt:channel.createdAt
//                         }
//                     }
//                 }))}
//             }
//             res.status(200).json(response);
//         }else{
//             res.status(200).json({message: 'No Message'});
//         }
//     }).catch(err=> {
//         console.log(err)
//         res.status(500).json({error:err});
//     });
// }   

// Promise.all([
//     User.find({ _id: req.body.userId }),
//     User.find({ username: decodedUser.username})
//   ]).then( ([ user, member ]) => {
//     console.log( util.format( "user=%O member=%O", user, member ) );
//   });




// add reactions to channel message
exports.channel_add_reaction_to_channel_message = (req,res,next)=>{
    const messageid = req.params.messageid
    console.log(messageid);
    ChannelsMessage.findOneAndUpdate({_id:messageid},
        {
            $addToSet:{
                channelMessageReaction:{
                    reactionContent:req.body.reactionContent,
                    userInformation:req.userData.userId
                }
            }
        }).exec()
    .then(result=> {
        res.status(200).json({
            message:"success",
            user:result
        });
    }).catch(err=> {
        console.log(err)
        res.status(500).json({error:err});
    });
}

// add reactions to channel message

// exports.channel_add_reaction_to_channel_message = (req,res,next)=>{
//     const messageid = req.params.messageid
//     const messageReaction = new ChannelMessageReaction({
//         _id : mongoose.Types.ObjectId(),
//         reactionContent :req.body.reactionContent,
//         userInformation : req.userData.userId,
//         channelMessage : messageid
//     });
//     messageReaction.save()
//     .then(doc=>{
//         res.status(201).json({
//             message:'created',
//             message:doc
//         });
//     }).catch(err=>{
//         res.status(500).json({
//             message: 'faill',
//             Error: err
//         });
//     }); 
// }

exports.channel_message_to_conversation = (req,res,next)=>{
    const messageid = req.params.messageid
    console.log(messageid);
    
    ChannelsMessage.update({_id:messageid},
        {
            $set:{
                channelMessageConversation:true
            }
        }).exec()
    .then(result=> {
        res.status(200).json({
            message:"success",
            user:result
        });
    })
}


//delete a message
exports.delete_message = (req,res,next)=>{
    const id = req.params.messageid
    ChannelsMessage.remove({_id:id,userInformation:req.userData.userId})
    .exec()
    .then(channel=>{
        res.status(200).json({
            message:"removed"
        });
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}
