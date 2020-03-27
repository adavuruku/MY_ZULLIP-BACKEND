const mongoose = require('mongoose');
let timestampPlugin = require('./plugins/timestamp')
let validator = require('validator')

const userInformation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password:{type:String, trim:true,required:true},
    fullName:{type:String, trim:true,required:true},
    displayName:{type:String,trim:true,default:null},
    whatIdo:{type:String,trim:true,default:null},
    phone:{type:String, trim:true,required:true},
    role:{type:Number, default:0},
    online:{type:Number, default:1},
    profileImage:{type:String,default:null}
});

userInformation.plugin(timestampPlugin)
module.exports = mongoose.model('UserInformation',userInformation);