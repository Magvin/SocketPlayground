
const test = require('./json/test.json')
const bodyParser = require('body-parser');
var http = require('http');
var socket = require('socket.io')
const express = require('express')
const cors = require("cors")
const app = express()
app.use(cors())
const httpServer = http.createServer(app);
app.use(bodyParser.json())


const mockedFiles = [{
  id: 1,
  title: 'Test Json',
  data: test
}]




const sc = new socket.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});




sc.on('connection', function (socket) {
  var id = socket.id;
  const users = new Map();
  socket.on('mouse', function (data) {
    users.set(id, data.id)
    socket.broadcast.emit('mouse', {
      userName: data.userName,
      x: data.x,
      y: data.y,
      id: data.id
    });
  });
  socket.on('json', function(ev){
    const index = mockedFiles.findIndex(item=> item.id.toString() === ev.id);
    mockedFiles[index].data = ev.data
    socket.broadcast.emit('value', ev.data);
  })
  socket.on('disconnect', function () {
    const userLeft = users.get(id)
    if(userLeft) {
      sc.emit('leave',userLeft );
    }
  });
})

app.get('/json', function(req,res) {
  res.send(mockedFiles)
})

app.post('/json/save', function(req,res){
  const response = req.body 
  const index = mockedFiles.findIndex(item=> item.id.toString() === response.id);
  mockedFiles[index].data = req.body.value
  res.send({
    status: index > -1 ? 200 : 404,
    response: req.body
  }); 
})

httpServer.listen(4000);