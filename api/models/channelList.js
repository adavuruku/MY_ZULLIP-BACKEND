let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');

const channelList = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelName:{type:String, required:true, unique:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    channelStatus:{type:String, default:1},
    channelDescription: String
});

channelList.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelList',channelList);