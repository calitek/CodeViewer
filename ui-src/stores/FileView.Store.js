import Reflux from 'reflux';

import saActions from '../actions/sa.Actions';
import flActions from '../actions/fl.Actions';
import apiActions from '../actions/api.Actions';

function _GotFile(data) {
  this.fileData = data.fileData;
  FileViewStore.trigger('fileData');
  apiActions.apiSetSavedFileList();
}

function _init() {
  this.listenTo(saActions.gotFile, this.onGotFile);
}

let FileViewStoreObject = {
  fileData: '',
  init: _init,
  onGotFile: _GotFile,

  getFile() { return this.fileData; }
}
const FileViewStore = Reflux.createStore(FileViewStoreObject);
export default FileViewStore;
