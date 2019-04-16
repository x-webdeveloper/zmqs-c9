var zmq = require(zmq);
var rep;
var reply = zmq.socket(rep);

reply.bind(
    'tcp://127.0.0.1:5555',
    function(err) {if (err) throw err;});
    
var message;
reply.on(
    message, 
    function(msg) {
        console.log('Received:' + msg);
        reply.send("Pong");
    });