const mongoose = require('mongoose');
const channelMessageConversation = require('../models/channelMessageConversation');

//create channel
exports.add_message = (req,res,next)=>{
    const chan = new channelMessageConversation({
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

// add reactions to channel message
exports.channel_add_reaction_to_conversation_message = (req,res,next)=>{
    const messageid = req.params.conversationid
    console.log(messageid);
    channelMessageConversation.findOneAndUpdate({_id:messageid},
        {
            $addToSet:{
                conversationMessageReaction:{
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