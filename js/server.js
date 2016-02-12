'use strict';

let Emitter = require('primus-emitter');
let express = require('express');
let favicon = require('serve-favicon');
let path = require('path');

let Primus = require('primus');
let socketCallBack = function(socket){ require('./mainskt.js')(socket); };

let port = Number(process.env.PORT38 || 3800);

let app = express();
let server = app.listen(port);

let sio = new Primus(server, { transformer: 'websockets', parser: 'JSON' });
sio.use('emitter', Emitter);

let newPrimusOptions = false;
if (newPrimusOptions) {
	sio.library();
	sio.save('./ui-src/lib/primus/primus.js');
}

sio.on('connection', socketCallBack);

app.use('/', express.static('ui-dist'));
app.use(favicon(path.join(__dirname, '..', 'ui-dist', 'img', 'favicon.ico')));
app.get('/', function(req, res){ res.sendfile(__dirname + '/index.html', [], null); });
