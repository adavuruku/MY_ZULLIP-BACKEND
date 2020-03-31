let timestampPlugin = require('./plugins/timestamp')
const mongoose = require('mongoose');


const channelMessageReaction = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userInformation:{type:mongoose.Schema.Types.ObjectId, ref:'UserInformation',required:true},
    channelMessage:{type:mongoose.Schema.Types.ObjectId, ref:'channelMessage',required:true},
    reactionContent: {type:String,trim:true, default:null}
});

channelMessageReaction.plugin(timestampPlugin)

module.exports = mongoose.model('channelMessageReaction',channelMessageReaction);