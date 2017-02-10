var net = require('net');
var HOST = '192.168.1.162';
var PORT = 5025;
var client = new net.Socket();
client.connect(PORT,HOST,function(){
    console.log('connected to :'+HOST+':'+PORT);
    client.write('*IDN?\n');
});
client.on('data',function(data){
    console.log('data :'+data);
    
});
client.on('close',function(){
    console.log('connection close');
});