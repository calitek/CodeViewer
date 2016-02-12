'use strict';

let getSetData = require('./routes/GetSetData');
let readTree = require('./routes/readTree');

module.exports = function(socket) {

  let onReadTree = function(event) { readTree.readTree(event, onGetFileList); };
  socket.on('client:readTree', onReadTree);

  let getFileDone = function(event, data){ event.sender.send('server:GotFile', data); };
  let onGetFile = function(event, data) { getSetData.getFile(event, data, getFileDone); };
  socket.on('client:getFile', onGetFile);

  let getFileListDone = function(event, data){ event.sender.send('server:GotFileList', data); };
  let onGetFileList = function(event){ getSetData.getFileList(event, getFileListDone); };
  socket.on('client:getFileList', onGetFileList);

  let onSetFileList = function(event, data){ getSetData.setFileList(data); };
  socket.on('client:setFileList', onSetFileList);
};
