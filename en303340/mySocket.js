var net=require('net');
var sockets = [];


function closeSocket(socket) {
	var i = sockets.indexOf(socket);
	if (i != -1) {
		sockets.splice(i, 1);
	}
}

function receiveData(socket,data) {
	for(var i = 0; i<sockets.length; i++) {
		if (sockets[i] != socket){
			sockets[i].write("hello:"+data);	
			
		}
		
	}
}
 
function newSocket(socket){
	sockets.push(socket);
	socket.write('welcome');
	socket.on('data',function(data){
		receiveData(socket,data);
	});
	socket.on('end',function(){
		closeSocket(socket);
	});
	
}

var server = net.createServer(newSocket);
server.listen(8888);