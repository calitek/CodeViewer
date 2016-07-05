'use strict';

require("./index.html");
require("./css/darkula.css");
require("./css/index.css");
require("./img/favicon.ico");
require("./img/fire.ico");
require("./img/leaf.ico");
require("./img/moon.ico");
require("./img/snow.ico");
require("./img/sun.ico");

import React  from 'react';
import ReactDom  from 'react-dom';

import AppCtrl from './components/app.ctrl.js';
import Actions from './actions/api.Actions';
import ApiStore from './stores/Api.Store';

window.ReactDom = ReactDom;

// Actions.apiInit('ipc');
Actions.apiInit('ws');

ReactDom.render( <AppCtrl />, document.getElementById('react') );

let Remarkable = require('remarkable');
let hljs       = require('highlight.js');
let async = require('async');
