const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();




var cors = require('cors')
const fileUpload = require('express-fileupload')
//to assign a foldr to be static in node JS
//you can enable it using bellow
//you can now access the folder without request
//as well the folder is now availabe for everyone
// app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use(fileUpload({useTempFiles:true}))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//enable cors


// const s = require('./server');

// app.get('/runtime',(res,req)=>{
//     socketIO = s.getSocket()
//     console.log(socketIO)
//     socketIO.on('connection', (ws)=> {
//         console.log("connected");
//         ws.on('chat-message', (message) =>{
//             console.log('received: %s c m', message);
//             socketIO.emit('chat-message', message)
//         });
//         ws.on('send-chat-message', (message) =>{
//             console.log('received s m : %s', message);
//             socketIO.emit('send-chat-message', message)
//         });
//     });
// })
// let server = () =>  s.getServer(
const con = require('./api/route/connection');

//enable cors
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Origin",
//     "Origin, X-Requested-With, Contenet-Type, Accept, Authorization");
//     if(req.method == 'OPTIONS'){
//         res.header('Access-Control-Allow-Origin','PUT, PATCH, POST, DELETE, GET');
//         res.status(200).json({});
//     }
//     next();
// });


// const socket = require('./websocket');
// app.get('/realcomm/:channelid',(res,req)=>{
//     //console.log(socket);
//     console.log(req.params.channelid)
//     const websocket = require('./websocket');
//     let wss = websocket.createWesocket()
//     wss.on('connection', (ws)=> {
//         ws.on('message', (message) =>{
//             console.log('received: %s', message);
//             wss.clients.forEach(users => {
//                if (req.params.channelid == "1234"){
//                    console.log(req.params.channelid)
//                     users.send(message)
//                 }
//             });
//             // ws.send(message);
//         });
    
//         ws.on('close',()=>{
//             console.log("client out");
//         }) 
//         console.log("client connected");
//     });

// });

//create the server - and the listening socket
const port = process.env.PORT || 3000;

const http = require('http');
const server = http.createServer(app);
const socketIO =require('socket.io')(server);
socketIO.on('connection', (ws)=> {
    console.log("connected");
    // socketIO.emit('abbas', 'message abbas')
    // socketIO.emit('sherif', 'message Sherif')
    // // ws.on('sherif', (message) =>{
    // //     // console.log('received: %s c m', message);
    // //     socketIO.emit('sherif', 'message Sherif')
    // // });
    // // ws.on('abbas', (message) =>{
    // //     // console.log('received: %s c m', message);
    // //     socketIO.emit('abbas', 'message abbas')
    // });
});

server.listen(port);
//ends here.
const Channels = require('./api/models/channelList');
app.get('/createChannel',(req,res)=>{
    // console.log(req.query.user)
    let id = req.query.channelid;
    Channels.findById(id)
    .populate('userInformation')
    .exec()
    .then(chan=>{
        let channel = {
            channelName:chan.channelName,
            channelDescription:chan.channelDescription,
            channelPrivate : chan.channelPrivate,
            createdAt:chan.createdAt
        }
        socketIO.emit(chan.userInformation._id, channel)
        res.status(201).json(
            channel
        );
    }).catch(err=> {
        res.status(500).json({error:err});
    });  
    
})

const ChannelsMessage = require('./api/models/channelMessage');
app.get('/messageChannel',(req,res)=>{
    // console.log(req.query.user)
    let id = req.query.messageid;
    let channelid = req.query.channelid;
    ChannelsMessage.findById(id)
    .populate('userInformation')
    .exec()
    .then(chan=>{
        let channel = {
            messageContent:chan.messageContent,
            postedBy:{
                fullName:chan.userInformation.fullName,
                profileImage:chan.userInformation.profileImage,
            },
            createdAt:chan.createdAt
        }
        socketIO.emit(channelid, channel)
        res.status(201).json(
            channel
        );
    }).catch(err=> {
        res.status(500).json({error:err});
    });    
})

const ChannelsUsers = require('./api/models/channelUsers');
app.get('/addUserToChannel',(req,res)=>{
    let channelid = req.query.channelid;
    ChannelsUsers.find({channelInfo:channelid})
    .populate('userInformation')
    .populate('channelInfo')
    .exec()
    .then(channelUser=>{
        if(channelUser.length > 0){
            const response={
                count: channelUser.length,
                channelid:channelUser[0].channelInfo._id,
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
            socketIO.emit("channelid", response)
            res.status(200).json(response);
        }else{
            res.status(202).json({message: 'No Users Yet'});
        }
    }).catch(err=> {
        res.status(500).json({error:err});
    });    
})

const channelListRoutes = require('./api/route/channelList');
app.use('/channels',channelListRoutes);

const usersRoutes = require('./api/route/usersInformation');
app.use('/users',usersRoutes);

const channelUsersRoutes = require('./api/route/channelUsers');
app.use('/channelUsers',channelUsersRoutes);

const channelMessageRoutes = require('./api/route/channelMessage');
app.use('/message',channelMessageRoutes);


const channelMesageConversationRoutes = require('./api/route/channelMessageConversation');
app.use('/messageConversation',channelMesageConversationRoutes);

//handle errors - thats invalid request 
//reason you have it after all the middleware above

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
});


app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    });
});




// module.exports = app;