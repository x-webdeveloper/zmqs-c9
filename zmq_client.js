
var zmq = require(zmq);
request = zmq.socket(req);
request.connect(
    tcp://127.0.0.1:5555);
    request.send(Ping);
    request.on(
            message, 
            function(msg) {
                console.log(Response: + msg);
        }); 