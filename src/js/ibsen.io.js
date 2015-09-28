/*
 * jQuery Ibsen Buzz!
 * @author: Luis Suárez (@HolaSoyGuicho)
 * @url: https://ibsenbuzz.com/projects/ibsenjs
 * 
 * @package: IbsenJS - Socket.IO
 * @file: ibsen.io.js
 */
(function ($, $Ibsen) {
    if (typeof $ === 'undefined') {
        console.error('$Ibsen.io require jQuery. Download http://jquery.com/');
    } else if (typeof $Ibsen === 'undefined') {
        console.error('$Ibsen.io require $IbsenJS. Download https://ibsenbuzz.com/projects/ibsenjs');
    } else {
        $Ibsen.io = function (object) {
            return $Ibsen.io.socket.connect(object);
        };

        $Ibsen.io.socket = {
            _join:    'IbsenBuzz',
            io:     null,
            nsp:        'Ibsen::io',
            _socketId: null,
            _debug:      false,
            _connected: false,
            _params: {},
            debug: function(msg) {
                if (this._debug) {
                    $Ibsen.error.debug('Ibsen::io/debug: ' + msg);
                }
                return true;
            },
            getSocketId: function () {
                return this._socketId;
            },
            getJoinId: function() {
                return this._join;
            },
            isConnected: function() {
                return this._connected;
            },
            testConnected: function() {
                $Ibsen.io.socket.on('connection', function(data) {
                    $Ibsen.io.socket._socketId = data.id;
                    $Ibsen.io.socket._connected = data.connected;

                    if ($Ibsen.io.socket.ioSupport()) {
                        if ($Ibsen.io.socket.isConnected()) {
                            $Ibsen.io.socket.debug('Socket connect to ' + $Ibsen.io.socket._params.host + ':' + $Ibsen.io.socket._params.port);
                            $Ibsen.io.socket.debug('Socket ID: ' + $Ibsen.io.socket.getSocketId());

                            if ($Ibsen.isValidType($params.load, 'function')) {        
                                $Ibsen.io.socket._params.load($Ibsen.io.socket);
                            }

                            return true;
                        }
                    }

                    return false;
                });

                return false;
            },
            ioSupport:  function () {
                if (typeof io !== 'undefined') {
                    return true;
                }
                $Ibsen.error.log('$Ibsen.io require socket.io-client. Download http://socket.io/download/');
                return false;
            },
            setJoinId: function(join_id) {
                if (!$Ibsen.isValidType(join_id, 'string') || join_id.indexOf('"') !== -1 || join_id.indexOf("'") !== -1) {
                    $Ibsen.error.how('$Ibsen.io.socket.join(room_id) require id (string)', "Example 1:\n\t$io = $Ibsen.io().join('room_id');\nExample 2:\n\t$io = $Ibsen.io();\n\t$io.join('room_id');\nExample 3:\n\t$io = $Ibsen.io({join: 'room_id'});");
                } else {
                    this._join = join_id || this.getJoinId();
                    this.debug('joined room ' + this.getJoinId() + '.');
                }
                return this;
            },
            connect:    function (object) {
                if (!$Ibsen.isValidType(object, 'object')) {
                    $Ibsen.error.how('$Ibsen.io(object) require param type object.', "$io = $Ibsen.io({host: '127.0.0.1', port: 3002});");
                } else {
                    this._params = $params = $.extend({}, {
                        host: 'ws://127.0.0.1',
                        port: 3002,
                        debug: false,
                        nsp: 'Ibsen::io',
                        join: 'IbsenBuzz'
                    }, object || {});

                    if (this.ioSupport()) {
                        this.io = io.connect($params.host + ':' + $params.port);
                        this.testConnected();
                    }

                    if ($Ibsen.isValidType($params.debug, 'boolean')) {
                        this._debug = $params.debug;
                        this.debug('Debug is activated.');
                    }

                    if ($Ibsen.isValidType($params.nsp, 'string')) {
                        this.nsp = $params.nsp;
                        this.debug('namespace is change to ' + this.nsp + '.');
                    }

                    if ($Ibsen.isValidType($params.join, 'string')) {
                        this.setJoinId($params.join);
                    }

                    return this;
                }
                return {};
            },
            join:       function (join_id) {
                this.setJoinId(join_id);
                return this;
            },
            _buzz: function (nsp, object, emit) {
                $buzz_data = $.extend({}, {
                    nsp_emit: emit || this.nsp,
                    nsp: nsp,
                    data: object || {}
                }, {});

                if ($Ibsen.isValidType(nsp, 'string') && ($Ibsen.isValidType(object, 'string') || $Ibsen.isValidType(object, 'object'))) {
                    this.io.emit($buzz_data.nsp_emit, $buzz_data);
                    this.debug('\nSend buzz\n\t NSP: ' + $buzz_data.nsp + '\n\tDATA: ' + $buzz_data.data);

                    return this;
                }

                $Ibsen.error.how('$Ibsen.io.buzz(namespace, dataSend) require two params.', "Example 1:\n\t$Ibsen.io.socket.buzz('push message', 'Hi :)');\nExample 2:\n\t$io.buzz('push message', {username: 'Luis', message: 'Hi :)'});");
                return this;
            },
            buzzME:   function (nsp, object) {
                return this._buzz(this.nsp + ' ' + this.getSocketId() + ' ' + nsp, object, this.nsp + ' buzz_me');
            },
            buzz:   function (nsp, object) {
                return this._buzz(this.nsp + ' ' + nsp, object, this.nsp + ' buzz');
            },
            buzzRoom:   function (nsp, object, nsp_default) {
                return this._buzz(this.nsp + ' ' + this.getJoinId() + ' ' + nsp, object, this.nsp + ' buzz');
            },
            _on: function (nsp, fn) {
                if ($Ibsen.isValidType(nsp, 'string') && $Ibsen.isValidType(fn, 'function')) {
                    this.io.on(nsp, function (data) {
                        fn(data);
                    });
                    return this;
                }
                $Ibsen.error.how('$Ibsen.io.on(namespace, dataReceived) require two params.', "Example 1:\n\t$Ibsen.io.socket.on('push message', function(data) { \n\t// code here \n});\nExample 2:\n\t$io.on('push message', function(data) { \n\t// code here \n});");
                return this;
            },
            onME:         function (nsp, fn) {
                return this._on(this.nsp + ' ' + this.getSocketId() + ' ' + nsp, fn);
            },
            on:         function (nsp, fn) {
                return this._on(this.nsp + ' ' + nsp, fn);
            },
            onRoom:         function (nsp, fn) {
                return this._on(this.nsp + ' ' + this.getJoinId() + ' ' + nsp, fn);
            }
        };
    }
})(window.jQuery, window.$Ibsen);