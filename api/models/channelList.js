let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');

const channelList = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelName:{type:String, required:true, unique:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    channelStatus:{type:Number, default:0},
    channelPrivate:{type:Number, default:0},
    channelDescription: {type:String, default:null}
});

channelList.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelList',channelList);