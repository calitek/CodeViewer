'use strict';

import './index.html';
import './css/index.css';
import './css/twilightj.css';

import './img/favicon.ico';
import './img/fire.ico';
import './img/leaf.ico';
import './img/moon.ico';
import './img/snow.ico';
import './img/sun.ico';

import React  from 'react';
import ReactDom  from 'react-dom';
import {Provider} from 'react-redux';

import AppCtrl from './components/app.ctrl';
import AppStore from './store/App.Store';

window.ReactDom = ReactDom;

ReactDom.render(<Provider store={AppStore}><AppCtrl /></Provider>, document.getElementById('react'));

import 'async';
