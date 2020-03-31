let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');

const conversationMessageReaction = mongoose.Schema({
    userInformation:{type:String},
    reactionContent: {type:String,trim:true}
});

conversationMessageReaction.plugin(timestampPlugin)

const channelMessageConversation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message:{type:mongoose.Schema.Types.ObjectId, ref:'ChannelMessage',required:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    conversationMessage: {type:String,trim:true, required:true},
    conversationMessageReaction:[conversationMessageReaction]
});

channelMessageConversation.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelMessageConversation',channelMessageConversation);