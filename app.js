const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

let parentIO = io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('change-slide', function(nextSlide) {
    console.log('Next slide: ', nextSlide);
    parentIO.emit('child-change-slide', nextSlide);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});