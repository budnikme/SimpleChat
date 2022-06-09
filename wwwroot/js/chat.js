"use strict";

let connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();
//getting new messages
connection.on("ReceiveMessage", function (msg) {
    addMessage(msg);
})
//if button is pressed the function sends message to the server
document.getElementById("send").addEventListener("click", function (event) {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;
    connection.invoke("Send", username, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
//function which executes when the page is opens
connection.start().then(function () {
    connection.invoke("GetChatHistory").then(function (history) { //getting messages history
        for(let i = 0; i < history.length; i++) {
            addMessage(history[i]);
        }
    });
}).catch(function (err) {
    return console.error(err.toString());
});
//function which adds new message to ul
function addMessage(msg) {
    let encodedMsg = msg.time + " " + msg.username + ": " + msg.message;
    let li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messages").appendChild(li);
}
