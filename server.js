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

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ server });
// wss.on('connection', (ws)=> {
//     ws.on('message', (message) =>{
//         console.log('received: %s', message);
//         wss.clients.forEach(users => {
//             users.send(message)
//         });
//         // ws.send(message);
//     });
 
//     ws.on('close',()=>{
//         console.log("client out");
//     }) 
//     console.log("client connexted");
// });

server.listen(port);


let getServer = () => server

exports.getServer = getServer;
