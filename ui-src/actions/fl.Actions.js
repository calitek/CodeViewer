import Reflux from 'reflux';

let treeActions = [
  'selectTreeNode',
  'setTreeNodeClosed'
]

module.exports = Reflux.createActions(treeActions);
