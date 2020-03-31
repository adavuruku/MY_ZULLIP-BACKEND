let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');


const channelMessageReaction = mongoose.Schema({
    userInformation:{type:String},
    reactionContent: {type:String,trim:true}
});

channelMessageReaction.plugin(timestampPlugin)

const channelMessage = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelInfo:{type:mongoose.Schema.Types.ObjectId, ref:'ChannelList',required:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    channelMessageConversation:{type:Boolean, default:false},
    messageContent: {type:String,trim:true, required:true},
    channelMessageReaction: [channelMessageReaction]
});

channelMessage.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelMessage',channelMessage);
