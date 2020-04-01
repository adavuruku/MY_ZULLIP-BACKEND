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


const socketIO =require('socket.io')(server);

socketIO.on('connection', (ws)=> {
    console.log("connected");
    ws.on('chat-message', (message) =>{
        console.log('received: %s c m', message);
        socketIO.emit('chat-message', message)
    });
    ws.on('send-chat-message', (message) =>{
        console.log('received s m : %s', message);
        socketIO.emit('send-chat-message', message)
    });
});

server.listen(port);


 let getSocket = () => socketIO

exports.getSocket = getSocket;
