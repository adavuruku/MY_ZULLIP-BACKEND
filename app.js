const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload')
//to assign a foldr to be static in node JS
//you can enable it using bellow
//you can now access the folder without request
//as well the folder is now availabe for everyone
// app.use('/uploads', express.static('uploads'));


//se morgan to loggin requests
app.use(fileUpload({useTempFiles:true}))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const con = require('./api/route/connection');

//enable cors
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Contenet-Type, Accept, Authorization");
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Origin','PUT, PATCH, POST, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

// app.use('/products',productRoutes);
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

module.exports = app;