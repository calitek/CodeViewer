import Reflux from 'reflux';

let apiActions = [
  'apiInit',
  'apiSetFileList',
  'apiSaveFileList',
  'apiSetSavedFileList',
  'apiInitDone',
  'apiGetFile',
  'apiReadTree'
]

module.exports = Reflux.createActions(apiActions);
