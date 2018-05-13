import getFileDataDone from '../file/file.Actions';
import * as treeActions from '../tree/tree.Actions';

let socket = null;

export function wsMiddleware() {
  return next => (action) => {
    if (socket) {
      switch (action.type) {
        case 'ApiReadTree':
          socket.emit('client:readTree', {});
          break;
        case 'ApiGetFileData':
          socket.emit('client:getFileData', action.data);
          break;
        case 'ApiGetTreeData':
          socket.emit('client:getTreeData');
          break;
        case 'ApiSetTreeData':
          socket.emit('client:setTreeData', action.data);
          break;
        default: break;
      }
    }
    return next(action);
  };
}

export default function (store) {
  /* eslint-disable */
  socket = new io();
  /* eslint-enable */

  socket.on('server:GetFileDataDone', (data) => {
    store.dispatch(getFileDataDone(data.fileData));
  });

  socket.on('server:GetTreeDataDone', (data) => {
    store.dispatch(treeActions.getTreeDataDone(data));
  });
}
