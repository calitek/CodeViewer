'use strict';

const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
let fs = require('fs');
let config = require('./config.json');

let rootDataPath = config.macDataRoot;
if (process.platform == 'win32') rootDataPath = config.winDataRoot;

const {ipcMain} = electron;
require('./js/mainipc.js')(ipcMain);

let mainWindow = null;
let mainWindowOptions = {
  icon: './ui-dist/img/Clippets1.ico',
  title: 'Clippets'
};

app.on('window-all-closed', function() { app.quit(); });

app.on('ready', function() {
  mainWindow = new BrowserWindow(mainWindowOptions);

  let windowStatePath = rootDataPath + 'windowstate.json';
  let windowState = {};
  if (false) mainWindow.openDevTools();
  let jsonReadCallBack = function(err, data){
    if (err) console.log('error opening windowstate');
    else {
      windowState = JSON.parse(data.toString());
      mainWindow.setSize(windowState.size[0], windowState.size[1]);
      mainWindow.setPosition(windowState.position[0], windowState.position[1]);
    }
  };
  fs.readFile(windowStatePath, jsonReadCallBack);

  mainWindow.loadURL('file://' + __dirname + '/ui-dist/index.html');
  mainWindow.on('close', function() {
    windowState.size = mainWindow.getSize();
    windowState.position = mainWindow.getPosition();
    let writeFileCallBack = function (err) {
      if (err) console.log('error saving windowstate.json file ');
      mainWindow = null;
    };
    fs.writeFile(windowStatePath, JSON.stringify(windowState, null, 2), writeFileCallBack);
  });
});
