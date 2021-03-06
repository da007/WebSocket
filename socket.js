"use strict";

(function () {

	var socket;

    var init = function () {
		
		socket = new WebSocket(document.getElementById("sock-addr").value);

		socket.onopen = connectionOpen; 
		socket.onmessage = messageReceived; 
		//socket.onerror = errorOccurred; 
		//socket.onopen = connectionClosed;

        document.getElementById("sock-send-butt").onclick = function () {
            socket.send(document.getElementById("sock-msg").value);
        };


        document.getElementById("sock-disc-butt").onclick = function () {
            connectionClose();
        };

        document.getElementById("sock-recon-butt").onclick = function () {
            socket = new WebSocket(document.getElementById("sock-addr").value);
            socket.onopen = connectionOpen;
            socket.onmessage = messageReceived;
        };

    };


	function connectionOpen() {
	   socket.send("Connection with \""+document.getElementById("sock-addr").value+"\" Подключение установлено обоюдно, отлично!");
	}

	function messageReceived(e) {
	    console.log("Ответ сервера: " + e.data);
        document.getElementById("sock-info").innerHTML += (e.data+"<br />");
	}

    function connectionClose() {
        socket.close();
        document.getElementById("sock-info").innerHTML += "Соединение закрыто <br />";

    }


    return {

        load : function () {
            window.addEventListener('load', function () {
                init();
            }, false);
        }
    }
})().load();