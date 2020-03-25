const mongoose = require('mongoose');
let timestampPlugin = require('./plugins/timestamp')
const userInformation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password:{type:String, required:true},
    fullName:{type:String, required:true},
    displayName:{type:String},
    whatIdo:{type:String},
    phone:{type:String, required:true},
    role:{type:Number},
    online:{type:Number, default:1},
    profileImage:{type:String},
    createdAt:{type:Date},
    updatedAt: {type:Date}
});

userInformation.plugin(timestampPlugin)
module.exports = mongoose.model('UserInformation',userInformation);