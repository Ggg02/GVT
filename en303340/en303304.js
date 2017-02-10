var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var net = require('net');
var HOST = '192.168.1.162';
var PORT = 5025;
var RSclient = new net.Socket();

var server = http.createServer(
    function(req,rep){
        console.log('HTTP Connection');
        var path = url.parse(req.url).pathname;
        switch (path) {
            case '/':
                rep.writeHead(200,{'Content-Type':'text/html'});
                rep.write('hello');
                rep.end();
                break;
            case '/socket.html':
                fs.readFile(__dirname + path,function(error, data){
                    if (error){
                rep.writeHead(404);
                rep.write("opps this doesn't exist - 404");
                } else {
                rep.writeHead(200, {"Content-Type": "text/html"});
                rep.write(data, "utf8");
                }
                rep.end();
                });
                break;
            case '/connect.html':
                rep.writeHead(200, {"Content-Type": "text/html"});
                rep.write("RS connect", "utf8");  
                RSclient.connect(PORT,HOST,function(){
                  
                });
                break;
            case '/test.html':
                RSclient.write('*IDN?\n');
                RSclient.on('data',function(data){
                rep.writeHead(200, {"Content-Type": "text/html"});
                rep.write(data);
                console.log('data :'+data);

                });
                break;
            default:
                rep.writeHead(404);
                rep.write("opps this doesn't exist - 404");
                rep.end();
                break;
            
        }
    }
);
server.listen(8001);
var serv_io = io.listen(server);

serv_io.sockets.on('connection',function(socket){
    socket.emit('message',{'message':'hello'});
});


RSclient.on('close',function(){
    console.log('connection close');
});