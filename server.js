//create server object
const http = require('http');

/*******
 * register servlet i.e the app.js servlet
 */

 const app = require('./app');

 ///////

 
//set the server port
const port = process.env.PORT || 3000;
//create the server
const server = http.createServer(app);
//set server to start listening
server.listen(port);