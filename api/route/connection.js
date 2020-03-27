const mongoose = require('mongoose');
// Configuring the database
const dbConfig = module.exports = {
    url: 'mongodb://localhost:27017/myzullip'
};

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//export the servlet to the server
module.exports = mongoose;