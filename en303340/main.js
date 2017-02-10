var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(
    function(req,rep){
        console.log('Connection');
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