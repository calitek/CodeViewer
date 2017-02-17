'use strict';

let getSetData = require('./routes/GetSetData');
let readTree = require('./routes/readTree');

module.exports = function(socket) {

  let onReadTree = function(event) { readTree(event, onGetFileList); };
  socket.on('client:readTree', onReadTree);

  let getFileDataDone = function(event, data){ event.sender.send('server:GetFileDataDone', data); };
  let onGetFile = function(event, data) { getSetData.getFileData(event, data, getFileDataDone); };
  socket.on('client:getFileData', onGetFile);

  let getTreeDataDone = function(event, data){ event.sender.send('server:GetTreeDataDone', data); };
  let onGetFileList = function(event){ getSetData.getTreeData(event, getTreeDataDone); };
  socket.on('client:getTreeData', onGetFileList);

  let onSetFileList = function(event, data){ getSetData.setTreeData(data); };
  socket.on('client:setTreeData', onSetFileList);
};
