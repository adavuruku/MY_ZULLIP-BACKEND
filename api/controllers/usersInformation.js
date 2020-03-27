const mongoose = require('mongoose');
const Users = require('../models/usersInformation');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//cloudinary settings for image upload
var cloudinary = require('cloudinary').v2;
cloudinary.config = ({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



const bcrypt = require('bcrypt');
const token = (email, id) =>{
    return jwt.sign({
        email:email,
        userId: id
    },
    process.env.MY_HASH_SECRET);
}


exports.fileLoad = (req,res,next)=>{
    console.log(req.files.passport)
    console.log(req.body.name)
}


//user login
exports.users_user_login = (req,res,next)=>{
    Users.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log(req.body.email);
        if(user.length < 1){
            return res.status(404).json({
                message: 'Authentication failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Authentication failed'
                });            
            }
            if(result){
                const tokenValue = token(user[0].email,user[0]._id)
                return res.status(200).json({
                    message:'success',
                    user:user[0],
                    token:tokenValue
                });          
            }

            res.status(401).json({
                message:'Authentication failed'
            })      

        });
    })
    .catch(err=>{
        res.status(500).json({
            message: 'faill',
            Error: err
        });
    })
}


exports.users_create_signup = (req,res,next)=>{
    Users.find({email:req.body.email}).exec()
    .then(doc=>{
        if(doc.length >=1){
            return res.status(409).json({
                message:'User Already Exist !!'
            });
        }else{
            bcrypt.hash(req.body.password,10,(err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user = new Users({
                        _id : mongoose.Types.ObjectId(),
                        email :req.body.email,
                        password : hash,
                        fullName : req.body.fullName,
                        phone : req.body.phone
                    });
                    user.save()
                    .then(doc=>{
                        const tokenVal = token(doc.email,doc._id)
                        res.status(201).json({
                            message:'User Created !!',
                            user:doc,
                            token : tokenVal
                        });
                    }).catch(err=>{
                        console.log(err)
                        res.status(500).json({
                            message: 'faill',
                            Error: err
                        });
                    });
                }
            });
        }
    });
}

//update user
exports.users_update_information = (req,res,next)=>{
    var id = req.userData.userId;
    Users.find({_id:id}).exec()
    .then(doc=>{
        let fullName = !req.body.fullName ? doc[0].fullName :req.body.fullName;
        let displayName = !req.body.displayName ? doc[0].displayName :req.body.displayName;
        let whatIdo = !req.body.whatIdo ? doc[0].whatIdo :req.body.whatIdo;
        let phone = !req.body.phone ? doc[0].phone :req.body.phone;
        let role = !req.body.role ? doc[0].role :req.body.role;
        let online = !req.body.online ? doc[0].online :req.body.online;
        
        let profileImage = doc[0].profileImage
        if(req.files){
            cloudinary.uploader.upload(req.files.profileImage.tempFilePath,{ folder: "myzullip/", 
            public_id: id },(err,result)=>{
                if(result){
                    profileImage = result.secure_url;
                }
            })
        }
        Users.update({_id:id},
            {
                $set:{
                    fullName:fullName, 
                    displayName:displayName,
                    whatIdo:whatIdo,
                    phone:phone,
                    role:role,
                    online:online,
                    profileImage:profileImage
                }
            }).exec()
        .then(result=> {
            res.status(200).json({
                message:"success",
                user:result
        });
        }).catch(err=>{
            res.status(500).json({
                message:"faill",
                error:err
            });
        });
    }).catch(err=>{
        res.status(500).json({error:err});
    });
    
}


