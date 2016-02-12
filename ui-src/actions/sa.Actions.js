import Reflux from 'reflux';

let saActions = [
  'gotFileList',
  'gotNote',
  'gotFile',
  'gotConfig'
]

module.exports = Reflux.createActions(saActions);
