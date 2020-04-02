const mongoose = require('mongoose');
const ChannelMessageConversation = require('../models/channelMessageConversation');

//create channel
exports.add_message = (req,res,next)=>{
    const chan = new ChannelMessageConversation({
        _id : mongoose.Types.ObjectId(),
        userInformation :req.userData.userId,
        message : req.body.messageId,
        conversationMessage : req.body.conversationMessage
    });
    chan.save()
    .then(doc=>{
        res.status(201).json({
            message:'Success',
            user:doc
        });
    }).catch(err=>{
        res.status(500).json({
            message: 'faill',
            Error: err
        });
    });
}

//view All Conversation  / thread message
exports.users_view_conversation_message = (req,res,next)=>{
    const messageid = req.params.messageid
    console.log(messageid)
    ChannelMessageConversation.find({message:messageid}).sort('-createdAt')
    .populate('userInformation')
    .populate({
        path:'message',
        populate: {
            path: 'userInformation',
            model: 'UserInformation'
          } 
    })
    .exec()
    .then(messageConversation=>{
        if(messageConversation.length > 0){
            const response={
                count: messageConversation.length,
                messgeId: messageConversation[0].message._id,
                messageContent: messageConversation[0].message.messageContent,
                postedBy: messageConversation[0].message.userInformation.fullName,
                profileImage: messageConversation[0].message.userInformation.profileImage,
                allMessage: messageConversation.map(channel=>{
                    return {
                        conversationId: channel._id,
                        conversationMessage: channel.conversationMessage,
                        postedBy:{
                            fullname:channel.userInformation.fullName,
                            profileImage:channel.userInformation.profileImage
                        }, 
                        createdAt:channel.createdAt,ConversationMessageReaction: channel.conversationMessageReaction
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
exports.channel_add_reaction_to_conversation_message = (req,res,next)=>{
    const messageid = req.params.conversationid
    console.log(messageid);
    ChannelMessageConversation.findOneAndUpdate({_id:messageid},
        {
            $addToSet:{
                conversationMessageReaction:{
                    reactionContent:req.body.reactionContent,
                    userInformation:req.userData.userId
                }
            }
        }).exec()
    .then(result=> {
        if (result){
            res.status(200).json({
                message:"success",
                user:result
            });
        }else{
            res.status(201).json({
                message:"fail"
            });
        }
    })
}

//delete a message
exports.delete_conversation = (req,res,next)=>{
    const id = req.params.conversationid
    ChannelMessageConversation.remove({_id:id,userInformation:req.userData.userId})
    .exec()
    .then(channel=>{
        res.status(200).json({
            message:"removed"
        });
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}