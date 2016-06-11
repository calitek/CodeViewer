import lodash from 'lodash';
import Reflux from 'reflux';
import traverse from 'traverse';

import flActions from '../actions/fl.Actions';
import saActions from '../actions/sa.Actions';
import apiActions from '../actions/api.Actions';

let _treeData = {
  data: [],
  currentTreeNode: {}
}

function _gotFileList(fileList) {
  _treeData.data = fileList;
  _treeData.currentTreeNode = _getSelected(fileList);
  if (_treeData.currentTreeNode == null) _treeData.currentTreeNode = fileList[0];
  FileListStore.trigger();
}

function _setfileList() { apiActions.apiSetFileList(_treeData.data); }

function _getSelected(tree) {
  let result = null;
  lodash.each(tree, function(node) {
    if (node.selected) result = node;
    if(result === null && (node.children && node.children.length > 0)) result = _getSelected(node.children);
  });
  return result;
}

function _getNodeIndex(treeNode) {
  let fileList = _treeData.data;
  let nodeID = treeNode.nodeid;
  if (lodash.isEmpty(nodeID)) { return []; }

  let nodeIdArray = nodeID.split("/"),
    searchID = nodeIdArray.shift(),
    nodeIndex = [],
    index,
    nextSearchID;

  if (searchID.length == 0) searchID = nodeIdArray.shift();
  while (searchID) {
    if (!fileList) { return []; }
    let treeItem = lodash.find(fileList, {nodeid: searchID});
    index = lodash.indexOf(fileList, treeItem);
    if (index < 0) { return []; }
    nodeIndex.push(index);
    nextSearchID = nodeIdArray.shift();
    if (nextSearchID) {
      searchID += '/' + nextSearchID;
      fileList = fileList[index].children;
      if (fileList) { nodeIndex.push("children"); }
    }
    else searchID = nextSearchID;
  }

  return nodeIndex;
}

function _selectTreeNode(treeNode) {
  let nodeIndex1 = _getNodeIndex(_treeData.currentTreeNode);
  nodeIndex1.push('selected');
  traverse(_treeData.data).set(nodeIndex1, false);
  _treeData.currentTreeNode = treeNode;
  let nodeIndex2 = _getNodeIndex(_treeData.currentTreeNode);
  nodeIndex2.push('selected');
  traverse(_treeData.data).set(nodeIndex2, true);

  FileListStore.trigger();
  if (treeNode.children.length > 0) {
    _setfileList();
    saActions.gotFile({fileData: '', noteData: {note: '', nodeid: ''}});
  } else {
    let filePath = treeNode.rootpath + treeNode.nodeid;
    apiActions.apiSaveFileList(_treeData.data);
    apiActions.apiGetFile({filePath: filePath, nodeid: treeNode.nodeid});
  }
}

function _setTreeNodeClosed(treeNode) {
  let nodeIndex = _getNodeIndex(treeNode);
  nodeIndex.push('closed');
  let visible = traverse(_treeData.data).get(nodeIndex);
  if (typeof visible === 'undefined') visible = false;
  else visible = !visible;
  if (visible) traverse(_treeData.data).set(nodeIndex, true);
  else traverse(_treeData.data).set(nodeIndex, false);

  FileListStore.trigger();
  _setfileList();
}

function _fileListStoreInit() {
  this.listenTo(saActions.gotFileList, this.onGotFileList);

  this.listenTo(flActions.selectTreeNode, this.onSelectTreeNode);
  this.listenTo(flActions.setTreeNodeClosed, this.onSetTreeNodeClosed);
}

let FileListStoreObject = {
  init: _fileListStoreInit,
  onGotFileList: _gotFileList,
  onSelectTreeNode: _selectTreeNode,
  onSetTreeNodeClosed: _setTreeNodeClosed,

  getTreeData() { return _treeData; }
}
const FileListStore = Reflux.createStore(FileListStoreObject);
export default FileListStore;
