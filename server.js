const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const rooms = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = { note: '', users: [] };
    }

    rooms[roomId].users.push(socket.id);

    io.to(roomId).emit('userList', rooms[roomId].users);

    socket.on('editNote', ({ roomId, note }) => {
      rooms[roomId].note = note;
      socket.to(roomId).emit('noteUpdate', note);
    });

    socket.on('disconnect', () => {
      rooms[roomId].users = rooms[roomId].users.filter((id) => id !== socket.id);
      io.to(roomId).emit('userList', rooms[roomId].users);
    });
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
