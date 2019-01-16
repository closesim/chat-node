const express = require('express');
const path = require('path');
const app = express();
//Websockets
const SocketIO = require('socket.io')

//settings
app.set('port', process.env.PORT || 3000);

//static file
console.log("__dirname: " + path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

//star the server
const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});


const io = SocketIO(server);

var chat = io.of('/chat').on('connection', (socket) => {
    console.log('new connection Chat', socket.id);

    socket.on('chat:message', (data) => {
        chat.emit('chat:message', data);
        console.log('llego un mensaje', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
        console.log('estan escribiendo', data);
    });
})