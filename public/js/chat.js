const socket = io();

let username = document.getElementById('username');
let message = document.getElementById('message');
let messages = document.getElementById('messages');
let actions = document.getElementById('actions');

document.getElementById('btn').addEventListener('click', (e) => {
	e.preventDefault();

	socket.emit('chat:message', {
		username: username.value,
		message: message.value
	});

});

message.addEventListener('keypress', () => {
	socket.emit('chat:typing', username.value);
});

socket.on('chat:message', (data) => {
	actions.innerHTML = '';
	messages.innerHTML += `
		<div class="card">
			<div class="card-header mb-4">
				<h4 class="card-tite">${data.username}</h4>
			</div>
			<div class="card-body">
				<p class="card-text">${data.message}</p>
			</div>
		</div>
	`;
});

socket.on('chat:typing', (data) => {
	actions.innerHTML = `
		<p>${data} is typing</p>
	`;
});