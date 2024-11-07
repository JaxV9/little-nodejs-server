import express from 'express';
import http from 'http';
import ip from 'ip';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})
app.use(cors())
app.get('/', (req, res) => {
// res.json('ip address: http://' + ip.address() + ':' + PORT);
    res.json('hello')
});
let object = "";
app.get('/box', (req, res) => {
    res.send({"box": object});
    object = "";
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('user disconnected');
    });
    socket.on('message', (msg) => {
        console.log('message: ' + msg['message']);
        object = msg['message']
        io.emit('box', {'name': msg['message']});
    });
})



server.listen(PORT, () => {
    console.log('Server ip : http://' + ip.address() + ":" + PORT);
})

