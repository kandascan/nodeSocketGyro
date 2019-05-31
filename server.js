const express = require('express');
const socket = require('socket.io');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
    console.log('Server running on port: ' + port);
});

const io = socket(server);

io.on('connection', function(socket){
    console.log(socket.id + ' user connected via socket');
    socket.on('message', data => {     
        //console.log(data);
        io.sockets.emit('recieveAccelerometerDatea', data);
    });
});
