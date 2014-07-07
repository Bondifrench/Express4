window.onload = function () {
	console.log('chat.js has been loaded!');
	
	var messages = [];
	//var socket = io.connect('http://localhost:3700');
	// actually don't need to specify an URL since it defaults
	var socket = io(); // to trying to connect to the hostthat serves the page
	var field = document.getElementById('field');
	var sendButton = document.getElementById('send');
	var content = document.getElementById('content');
	var name = document.getElementById('name');

	socket.on('message', function (data) {
		if (data.message) {
			messages.push(data);
			var html = '';
			for (var i=0;i<messages.length;i++) {
				html += '<b>' + (messages[i].username ? messages[i].username :  'Server') + ': </b>' //We prepend our messages with the name of the user
				html += messages[i].message +'</br>';
			}
			content.innerHTML = html;
			content.scrollTop = content.scrollHeight; // This is to enable to scroll the div if number of messages gets too high
		} else {
			console.log('There is a problem:', data);
		}
	});

	sendButton.onclick = function () {
		if (name.value == '') {
			alert('Please type your name!');
		} else {
			var text = field.value;
			socket.emit('send', {message: text, username: name.value});
			field.value = ''; //This is to clear the field value after sending a message!
		}
		
	};
}