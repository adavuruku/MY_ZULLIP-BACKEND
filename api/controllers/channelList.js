const mongoose = require('mongoose');
const Channels = require('../models/channelList');
const websocket = require('../../websocket');
const url = require('url')
const ChannelsUsers = require('../models/channelUsers');


//create channel
exports.create_new_channel = (req,res,next)=>{
    Channels.find({channelName:req.body.channelName}).exec()
    .then(channel=>{
        if(channel.length >=1){
            return res.status(409).json({
                message:'Channel Title Already Exist !!'
            });
        }else{
            const chan = new Channels({
                _id : mongoose.Types.ObjectId(),
                userInformation :req.userData.userId,
                channelName : req.body.channelName.trim(),
                channelDescription : req.body.channelDescription, 
                channelPrivate : req.body.channelPrivate 
            });
            chan.save()
            .then(doc=>{
                // res.status(201).json({
                //     message:'Channel Created !!',
                //     user:doc
                // });
                // console.log(doc.createdAt);
                //add him as a user of the channel
                const chanUser = new ChannelsUsers({
                    _id : mongoose.Types.ObjectId(),
                    userInformation :req.userData.userId,
                    channelInfo : doc._id
                });
                chanUser.save()
                .then(docnew=>{
                    res.redirect(url.format({
                        pathname:'/createChannel',
                        query:{
                            channelid:doc._id.toString()
                        }
                    }))
                }).catch(err=>{
                    res.status(500).json({
                        message: 'faill',
                        Error: err
                    });
                }); 
            }).catch(err=>{
                res.status(500).json({
                    message: 'faill',
                    Error: err
                });
            });
        }
    });
}

//retrieve a channel
exports.find_channel = (req,res,next)=>{
    const id = req.params.channelid
    // console.log(req.params.channelid)
    Channels.findById(id)
    .populate('userInformation','fullName')
    .exec()
    .then(channel=>{
        if(channel){
            res.status(200).json({
                message:'success',
                channel : {
                    channelId: channel._id,
                    channelName: channel.channelName,
                    channelDescription: channel.channelDescription,
                    channelPrivate:channel.channelPrivate,
                    createdBy:channel.userInformation.fullName,
                    createdAt:channel.createdAt
                }
            });
        }else{
            res.status(200).json({message: 'Invalid Channel Id'});
        }
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}


//retrieve a channel
exports.list_all_channel = (req,res,next)=>{
    Channels.find().sort('-createdAt')
    .populate('userInformation','fullName')
    .exec()
    .then(channel=>{
        if( channel.length > 0){
            const response={
                count: channel.length,
                allChannels: channel.map(channel=>{
                    return {
                        channelId: channel._id,
                        channelName: channel.channelName,
                        channelDescription: channel.channelDescription,
                        channelPrivate:channel.channelPrivate,
                        createdBy:channel.userInformation.fullName,
                        createdAt:channel.createdAt,
                        request :{
                            type:"GET",
                            url:"http://localhost:3000/channels/"+channel._id
                        }
                    }
                })
            };
        
            res.status(200).json(response);
        }else{
            res.status(200).json({message: 'No Channels Yet'});
        }
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}


//retrieve all channel created by a user
exports.find_all_user_channel = (req,res,next)=>{
    const userId = req.params.userid
    Channels.find({userInformation:userId}).sort('-createdAt')
    .populate('userInformation','fullName')
    .exec()
    .then(channel=>{
        if( channel.length>0){
            const response={
                count: channel.length,
                allChannels: channel.map(channel=>{
                    return {
                        channelId: channel._id,
                        channelName: channel.channelName,
                        channelDescription: channel.channelDescription,
                        channelPrivate:channel.channelPrivate,
                        createdBy:channel.userInformation.fullName,
                        createdAt:channel.createdAt,
                        request :{
                            type:"GET",
                            url:"http://localhost:3000/channels/"+channel._id
                        }
                    }
                })
            };
       
            res.status(200).json(response);
        }else{
            res.status(200).json({message: 'No Channels Yet'});
        }
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}


//update user
exports.update_channel = (req,res,next)=>{
    const channelid = req.params.channelid
    Channels.find({_id:channelid}).exec()
    .then(doc=>{
        let channelDescription = !req.body.channelDescription ? doc[0].channelDescription :req.body.channelDescription;
        let channelPrivate = !req.body.channelPrivate ? doc[0].channelPrivate :req.body.channelPrivate;
        Channels.update({_id:channelid},
            {
                $set:{
                    channelDescription:channelDescription, 
                    channelPrivate:channelPrivate
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

//retrieve a channel
exports.delete_channel = (req,res,next)=>{
    const id = req.params.channelid
    Channels.remove({_id:id,userInformation:req.userData.userId})
    .exec()
    .then(channel=>{
        res.status(200).json({
            message:"removed"
        });
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}