'use strict';

let getSetData = require('./routes/GetSetData');
let readTree = require('./routes/readTree');

// The get and got nulls are for the event parameter that ipc calls
// require.

module.exports = function(socket) {

  let onReadTree = function() { readTree(null, onGetTreeData); };
  socket.on('client:readTree', onReadTree);

  let getFileDataDone = function(event, data){ socket.emit('server:GetFileDataDone', data); };
  let onGetFileData = function(data) { getSetData.getFileData(null, data, getFileDataDone); };
  socket.on('client:getFileData', onGetFileData);

  let getTreeDataDone = function(event, data){ socket.emit('server:GetTreeDataDone', data); };
  let onGetTreeData = function(){ getSetData.getTreeData(null, getTreeDataDone); };
  socket.on('client:getTreeData', onGetTreeData);

  let onSetTreeData = function(data){ getSetData.setTreeData(data); };
  socket.on('client:setTreeData', onSetTreeData);
};
