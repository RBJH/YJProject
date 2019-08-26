
var socket = io('/fullChat');
const room = "global";

window.onload = function(){
    const userName = document.getElementById('chatMsg').name;
    const data = {
        userName : userName,
        room : room
    }
    socket.emit('join', data);
}

socket.on("msgToClient", function(data){
    
    var msg = document.createTextNode(data);
    var br = document.createElement('br');

    document.getElementById('chatWindow').appendChild(msg);
    document.getElementById('chatWindow').appendChild(br);
    
});


function sendMsg(){
    
    msg = document.getElementById('chatMsg').value,
       
    socket.emit('msgToServer', msg);
}


