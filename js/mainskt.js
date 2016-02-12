'use strict';

let getSetData = require('./routes/GetSetData');
let readTree = require('./routes/readTree');

module.exports = function(socket) {

  let onReadTree = function() { readTree.readTree(null, onGetFileList); };
  socket.on('client:readTree', onReadTree);

  let getFileDone = function(event, data){ socket.send('server:GotFile', null, data); };
  let onGetFile = function(data) { getSetData.getFile(null, data, getFileDone); };
  socket.on('client:getFile', onGetFile);

  let getFileListDone = function(event, data){ socket.send('server:GotFileList', null, data); };
  let onGetFileList = function(){ getSetData.getFileList(null, getFileListDone); };
  socket.on('client:getFileList', onGetFileList);

  let onSetFileList = function(data){ getSetData.setFileList(data); };
  socket.on('client:setFileList', onSetFileList);
};
