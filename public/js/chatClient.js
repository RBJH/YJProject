
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

let cnt = 0;

socket.on("msgToClient", function(data){
    
    createChat("div", data);
    // var msg = document.createTextNode(data);
    // var br = document.createElement('br');

    // document.getElementById('chatWindow').appendChild(msg);
    // document.getElementById('chatWindow').appendChild(br);
    
});

//
function createChat(tagName, msgContent) {
    const div = document.createElement(tagName);

    div.className = `chat${cnt++}`;

    var msg = document.createTextNode(msgContent);
    var br = document.createElement('br');

    div.appendChild(msg);
    div.appendChild(br);

    document.getElementById('chatWindow').appendChild(div);
}
//


function sendMsg(){
    
    msg = document.getElementById('chatMsg').value,
       
    socket.emit('msgToServer', msg);
}


