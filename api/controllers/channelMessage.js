const mongoose = require('mongoose');
const ChannelsMessage = require('../models/channelMessage');
const ChannelMessageReaction = require('../models/channelMessageReaction');

exports.users_add_message = (req,res,next)=>{
    const message = new ChannelsMessage({
        _id : mongoose.Types.ObjectId(),
        messageContent :req.body.messageContent,
        userInformation : req.userData.userId,
        channelInfo : req.body.channelId
    });
    message.save()
    .then(doc=>{
        res.status(201).json({
            message:'created',
            message:doc
        });
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
    .populate('userInformation','fullName')
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
                        channelMessageReaction: channel.channelMessageReaction,
                        postedBy: channel.userInformation.fullName,
                        createdAt:channel.createdAt
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
    })
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
