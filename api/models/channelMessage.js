let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');

const channelMessage = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelInfo:{type:mongoose.Schema.Types.ObjectId, ref:'ChannelList',required:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    messageContent: {type:String, required:true}
});

channelMessage.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelMessage',channelMessage);