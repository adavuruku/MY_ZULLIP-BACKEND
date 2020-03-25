//servlet - takes care of request and reponse

//require for express framework
const express = require('express');

//logging package for node js
const morgan = require('morgan');

//body parser for loading ur values
const bodyParser = require('body-parser');
const app = express();

//to assign a foldr to be static in node JS
//you can enable it using bellow
//you can now access the folder without request
//as well the folder is now availabe for everyone
app.use('/uploads', express.static('uploads'));

/*  connecting to mongo db */
const con = require('./api/route/connection');
/** connection to mongo db ends here */

//reister every other routes here 
//since app is going to be our main route

const productRoutes = require('./api/route/products');
const ordersRoutes = require('./api/route/orders');
const usersRoutes = require('./api/route/users');
//se morgan to loggin requests
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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

app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);
app.use('/users',usersRoutes);


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
//req - httprequest res - httpresponse next - move controller to the next requysest
//response status 200 - ok 400 - badd

/*app.use((req,res, next)=> {
    res.status(200).json({
            message: 'It Works!! '
    });
});*/


//export the servlet to the server
module.exports = app;