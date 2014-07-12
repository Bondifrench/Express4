var express  = require('express');
var app = express();
var port = 3700;

app.set('views', __dirname + '/app/client/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express)
app.use(express.static(__dirname+'/app/client'))
app.get('/', function (req, res) {
	res.render('scotch');
})

//app.listen(port);
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
	console.log('A user connected');
	socket.emit('message', {message: 'Welcome to the chat room!'});
	socket.on('send', function (data) {
		console.log(data);
		io.sockets.emit('message', data)
	});
	socket.on('disconnect', function () {
		console.log('user disconnected');
	})
});

console.log('Listening on port: '+ port);