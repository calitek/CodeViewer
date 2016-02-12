import Reflux from 'reflux';

import Actions from '../actions/api.Actions';
import ApiFct from '../utils/api';

let ApiStoreObject = {
  timerSet: null,
  savedFileList: [{}],
  listenables: Actions,
  isIpc: true,
	apiInit(api) {
		if (api == 'ipc') ApiFct.ipcInit();
		else {this.isIpc = false; ApiFct.wsInit();}
	},
  apiInitDone() { ApiFct.getFileList(); },
  apiSetFileList(data) { ApiFct.setFileList(data); },
  apiSaveFileList(data) { this.savedFileList = data; },
  apiGetFile(filePath) { ApiFct.getFile(filePath); },
  apiReadTree() { ApiFct.readTree(); },
  apiSetSavedFileList() { ApiFct.setFileList(this.savedFileList); }
}
const ApiStore = Reflux.createStore(ApiStoreObject);
export default ApiStore;
