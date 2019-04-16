var cluster = require('cluster')
    , zeromq = require('zmq')
    , port = 'tcp://127.0.0.1:12345';

//fork
if (cluster.isMaster) {
    //Fork servers.
    for (var i = 0; i < 5; i++) {
        cluster.fork();
    }

    cluster.on('death', function(worker) {
        console.log('worker ' + worker.pid + ' died');
    });

}




if (cluster.isMaster) {
    //requester = client
    var socket = zeromq.socket('req');
    socket.identity = 'client ' + process.pid;

    socket.bind(port, function(err) {
        if (err) throw err;
        console.log('bound!');

        setInterval(function() {
            var value = Math.floor(Math.random()*100);
            console.log(socket.identity + ': asking ' + value);
            socket.send(value);
        }, 5000);


        socket.on('message', function(data) {
            console.log(socket.identity + ': answer data ' + data);
        });
    });
} 
else {
    //responder = server

    var socket = zeromq.socket('rep');

    socket.identity = 'server ' + process.pid;

    socket.connect(port);
    console.log('connected!');

    socket.on('message', function(data) {
        console.log(socket.identity + ': received ' + data.toString());
        socket.send(data * 2);
    });
}