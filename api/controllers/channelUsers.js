const mongoose = require('mongoose');
const ChannelsUsers = require('../models/channelUsers');
//add users to channel
exports.add_user_to_channel = async (req,res,next)=>{
    const channelInfo = req.params.channelid
    const userInformation = req.body.userid
    await userInformation.forEach(ele=>{
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
                    // res.status(201).json({
                    //     message:'Added'
                    // });
                }).catch(err=>{
                    // res.status(500).json({
                    //     message: 'faill',
                    //     Error: err
                    // });
                });
            }
        });
    })

    // console.log("Added")
    res.redirect(url.format({
        pathname:'/addUserToChannel',
        query:{
            channelid:channelInfo.toString()
        }
    }))

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
            res.status(200).json(response);
        }else{
            res.status(404).json({message: 'No Users Yet'});
        }
    }).catch(err=> {
        res.status(500).json({error:err});
    });
}

exports.get_all_user_channel = (req,res,next)=>{
    const userId = req.userData.userId
    ChannelsUsers.find({userInformation:userId})
    .populate('channelInfo').exec()
    .then(channel=>{
        if(channel.length > 0){
            const response={
                count: channel.length,
                allChannels: channel.map(chan=>{
                    return {
                        channelId: chan.channelInfo._id,
                        channelName: chan.channelInfo.channelName
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