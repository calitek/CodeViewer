import saActions from '../actions/sa.Actions';
import apiActions from '../actions/api.Actions';

module.exports = {
  api: {},
  ipcInit() {
    this.api = ipc;
    this.apiInit();
  },
  wsInit() {
    this.api = new Primus();
    this.apiInit();
  },
  apiInit() {
    this.api.on('server:GotConfig', this.gotConfig);
    this.api.on('server:GotFileList', this.gotFileList);
    this.api.on('server:GotFile', this.gotFile);
    apiActions.apiInitDone();
  },
  readTree() { this.api.send('client:readTree', {}); },

  getConfig() { this.api.send('client:getConfig', {}); },
  gotConfig(event, data) {  saActions.gotConfig(data); },

  getFileList() { this.api.send('client:getFileList', {}); },
  gotFileList(event, data) { saActions.gotFileList(data); },
  setFileList(data) { this.api.send('client:setFileList', data); },

  getFile(data) { this.api.send('client:getFile', data); },
  gotFile(event, data) { saActions.gotFile(data); },
};
