
const getSetData = require('./routes/GetSetData');
const readTree = require('./routes/readTree');

module.exports = (socket) => {
  const onReadTree = () => {
    readTree(onGetTreeData);
  };
  socket.on('client:readTree', onReadTree);

  const getFileDataDone = (data) => {
    socket.emit('server:GetFileDataDone', data);
  };
  const onGetFileData = (data) => {
    getSetData.getFileData(data, getFileDataDone);
  };
  socket.on('client:getFileData', onGetFileData);

  const getTreeDataDone = (data) => {
    if (data) socket.emit('server:GetTreeDataDone', data);
    else onReadTree();
  };
  let onGetTreeData = () => {
    getSetData.getData('FileTree', getTreeDataDone);
  };
  socket.on('client:getTreeData', onGetTreeData);

  const getTreeDataStateDone = (data) => {
    socket.emit('server:GetTreeDataStateDone', data);
  };
  const onGetTreeDataState = () => {
    getSetData.getData('FileTreeState', getTreeDataStateDone);
  };
  socket.on('client:getTreeDataState', onGetTreeDataState);

  const onSetTreeDataState = (data) => {
    getSetData.setData('FileTreeState', data);
  };
  socket.on('client:setTreeDataState', onSetTreeDataState);
};
