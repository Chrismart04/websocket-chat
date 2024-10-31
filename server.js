const express = require ('express');
const http = require ('http');
const {Server } = require ('socket.io');
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:5173',
        methods : ["GET", "POST"]
    }
});
app.use(express.json());

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});