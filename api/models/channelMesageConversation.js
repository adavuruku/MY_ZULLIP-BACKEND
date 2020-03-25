let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');

const channelMesageConversation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message:{type:mongoose.Schema.Types.ObjectId, ref:'ChannelMessage',required:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    conversationMessage: {type:String, required:true}
});

channelMesageConversation.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelMesageConversation',channelMesageConversation);