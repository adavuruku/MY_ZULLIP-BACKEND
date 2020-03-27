let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');

const channelUsers = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelInfo:{type:mongoose.Schema.Types.ObjectId, ref:'ChannelList',required:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    status: {type:Number, default:0}
});

channelUsers.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelUsers',channelUsers);