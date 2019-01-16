const socket = io()

//DOM elements
let message = document.getElementById('message');
let usermane = document.getElementById('usermane');
let btnsend = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btnsend.addEventListener('click', function () {
    socket.emit('chat:message', {
        usermane: usermane.value,
        message: message.value
    })
    console.log(usermane.value, message.value);
    message.value = '';
    message.focus();
});

message.addEventListener('keydown', function () {
    socket.emit('chat:typing', {
        usermane: usermane.value,
        typing: message.value.length > 1 ? true : false
    });
})

socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.usermane}</strong>: ${data.message}
    </p>
    `
});

socket.on('chat:typing', function (data) {
    actions.innerHTML = data.typing ? `<p><em>${data.usermane}  está escribiendo...</em></p>` : '';
});