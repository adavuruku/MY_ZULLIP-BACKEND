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

// var server = require('ws').Server;
// var s = new server({port:3000});

// app.get('/server',(req,res)=>{
//     s.on('connection', (ws)=>{
//         ws.on('message', (message)=>{
//             console.log("Received: "+ message);
//         })
//     })
// });


const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ server });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});


//set server to start listening
server.listen(port);