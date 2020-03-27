const mongoose = require('mongoose');
const ChannelsUsers = require('../models/channelUsers');
//add users to channel
exports.add_user_to_channel = (req,res,next)=>{
    const channelInfo = req.params.channelid
    const userInformation = req.body.userid
    userInformation.forEach(ele=>{
        ChannelsUsers.find({userInformation:ele,channelInfo:channelInfo }).exec()
        .then(channel=>{
            if(channel.length <=0){
                const chanUser = new ChannelsUsers({
                    _id : mongoose.Types.ObjectId(),
                    userInformation :ele,
                    channelInfo : channelInfo
                });
                chanUser.save()
                .then(doc=>{
                    res.status(201).json({
                        message:'Added'
                    });
                }).catch(err=>{
                    res.status(500).json({
                        message: 'faill',
                        Error: err
                    });
                });
            }
        });
    })
}


//retrieve all channel users
exports.list_all_channel_Users = (req,res,next)=>{
    const channelInfo = req.params.channelid
    ChannelsUsers.find({channelInfo:channelInfo})
    .populate('userInformation')
    .populate('channelInfo')
    .exec()
    .then(channelUser=>{
        const response={
            count: channelUser.length,
            channelName:channelUser[0].channelInfo.channelName,
            channelDescription:channelUser[0].channelInfo.channelDescription,
            createdAt:channelUser[0].channelInfo.createdAt,
            allChannelUsers: channelUser.map(channel=>{
                return {
                    userId:channel.userInformation._id,
                    fullName:channel.userInformation.fullName,
                    phone:channel.userInformation.phone,
                    profileImage:channel.userInformation.profileImage,
                    displayName:channel.userInformation.displayName,
                    email:channel.userInformation.email
                }
            })
        };
        if(channelUser){
            console.log(response);
            
            res.status(200).json(response);
        }else{
            res.status(200).json({message: 'No Users Yet'});
        }
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}

//remove yourself from channels
exports.delete_user_channel = (req,res,next)=>{
    const channelInfo = req.params.channelid
    const userInformation = req.userData.userId
    ChannelsUsers.remove({channelInfo:channelInfo,userInformation:userInformation})
    .exec()
    .then(channel=>{
        res.status(200).json({
            message:"removed"
        });
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}