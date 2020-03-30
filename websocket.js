const WebSocket = require('ws');
const s = require('./server');

let server = () =>  s.getServer()

let createWesocket = ()=>{
    server = s.getServer()
    const wss = new WebSocket.Server({ server });
    return wss;
}

exports.createWesocket = createWesocket;