"use strict";

let connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

connection.on("ReceiveMessage", function (user, message, time) {
    let encodedMsg = time + " " + user + ": " + message;
    let li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messages").appendChild(li);
})

document.getElementById("send").addEventListener("click", function (event) {
    console.log("clicked");
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;
    connection.invoke("Send", username, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});
