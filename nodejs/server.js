/*
 * jQuery Ibsen Buzz! Server
 * @author: Luis Suárez (@HolaSoyGuicho)
 * @url: https://ibsenbuzz.com/projects/ibsenjs
 *
 * @package: IbsenJS
 * @file: server.js
 */

var $express = require('express');
var $app     = $express();
var $server  = require('http').createServer($app);
var $io      = require('socket.io').listen($server);
var $config  = {
    PORT  : 3002,
    SERVER: '127.0.0.1'
};

$server.listen($config.PORT, $config.SERVER, function () {
    console.log('Ibsen::io Server is running and listening to port %s:%d...', $config.SERVER, $config.PORT);
});

$app.get('/', function ($req, $res) {
    $res.sendFile(__dirname + '/public/buzz.html');
});

$io.on('connection', function ($socket) {
    console.log($socket.id);

    $socket.emit('Ibsen::io connection', {
        id       : $socket.id,
        connected: true
    });

    $socket.on('Ibsen::io buzz_me', function (data) {
        $socket.emit(data.nsp, data.data);
    });

    $socket.on('Ibsen::io buzz', function (data) {
        $socket.broadcast.emit(data.nsp, data.data);
    });

    $socket.on('disconnect', function () {

    });
});