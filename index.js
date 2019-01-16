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

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
})