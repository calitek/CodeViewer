'use strict';

import React  from 'react';
import ReactDom  from 'react-dom';

import AppCtrl from './components/app.ctrl.js';
import Actions from './actions/api.Actions';
import ApiStore from './stores/Api.Store';

window.ReactDom = ReactDom;

Actions.apiInit('ipc');
// Actions.apiInit('ws');

ReactDom.render( <AppCtrl />, document.getElementById('react') );

let Remarkable = require('remarkable');
let hljs       = require('highlight.js');
let async = require('async');
