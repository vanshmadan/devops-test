const app = require('./index');
const http = require('http').createServer(app);

const PORT = 8080;
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('User Online');

  socket.on('canvas-data', (data) => {
    socket.broadcast.emit('canvas-data', data);
  });
});

http.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
