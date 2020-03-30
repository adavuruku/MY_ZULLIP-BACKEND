const mongoose = require('mongoose');
require('dotenv').config();
// Configuring the database

var devState = process.env.NODE_ENV
let conUrl =( devState == 'production') ? process.env.MONGO_LIVE_CON : process.env.MONGO_LOCAL_CON
const dbConfig = module.exports = {
    // url: 'mongodb://localhost:27017/myzullip'
    url: conUrl
};

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
}).then(() => {
    console.log("Successfully connected to the database", conUrl);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//export the servlet to the server
module.exports = mongoose;