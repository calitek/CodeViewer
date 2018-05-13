import * as fileActions from '../file/file.Actions';
import * as treeActions from '../tree/tree.Actions';

export function ipcMiddleware() {
  return next => (action) => {
    if (ipc) {
      switch (action.type) {
        case 'ApiReadTree':
          ipc.send('client:readTree', {});
          break;
        case 'ApiGetFileData':
          ipc.send('client:getFileData', action.data);
          break;
        case 'ApiGetTreeData':
          ipc.send('client:getTreeData');
          break;
        case 'ApiSetTreeData':
          ipc.send('client:setTreeData', action.data);
          break;
        default: break;
      }
    }
    return next(action);
  };
}

export default function (store) {
  ipc.on('server:GetFileDataDone', (event, data) => {
    store.dispatch(fileActions.getFileDataDone(data.fileData));
  });

  ipc.on('server:GetTreeDataDone', (event, data) => {
    store.dispatch(treeActions.getTreeDataDone(data));
  });
}
