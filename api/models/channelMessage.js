let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');


// const channelMessageReaction = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     userInformation:{type:String,default:null},
//     reactionContent: {type:String,trim:true, default:null}
// });

// channelMessageReaction.plugin(timestampPlugin)

const channelMessage = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelInfo:{type:mongoose.Schema.Types.ObjectId, ref:'ChannelList',required:true},
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    channelMessageConversation:{type:Boolean, default:false},
    messageContent: {type:String,trim:true, required:true}
    // channelMessageReaction: [channelMessageReaction]
});

channelMessage.plugin(timestampPlugin)
module.exports = mongoose.model('ChannelMessage',channelMessage);
