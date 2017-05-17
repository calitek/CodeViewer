import lodash from 'lodash';
import traverse from 'traverse';

function _gotTreeData(treedata) {
  let _currentTreeNode = _getSelected(treedata);
  if (_currentTreeNode == null) _currentTreeNode = treedata[0];
  return {treeData: treedata, currentTreeNode: _currentTreeNode};
}

function _getSelected(tree) {
  let result = null;
  lodash.each(tree, function(node) {
    if (node.selected) result = node;
    if(result == null && node.children.length > 0) result = _getSelected(node.children);
  });
  return result;
}

function _getNodeIndex(_treeData, treeNode) {
  let treeData = _treeData;
  let nodeID = treeNode.nodeid;
  if (lodash.isEmpty(nodeID)) { return []; }

  let nodeIdArray = nodeID.split('/'),
    searchID = nodeIdArray.shift(),
    nodeIndex = [],
    index,
    nextSearchID;

  while (searchID) {
    if (!treeData) { return []; }
    let treeItem = lodash.find(treeData, {nodeid: searchID});
    index = lodash.indexOf(treeData, treeItem);
    if (index < 0) { return []; }
    nodeIndex.push(index);
    nextSearchID = nodeIdArray.shift();
    if (nextSearchID) {
      searchID += '/' + nextSearchID;
      treeData = treeData[index].children;
      if (treeData) { nodeIndex.push('children'); }
    }
    else searchID = nextSearchID;
  }

  return nodeIndex;
}

function _selectTreeNode(_treeData, _currentTreeNode, treeNode) {
  let nodeIndex1 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex1.push('selected');
  traverse(_treeData).set(nodeIndex1, false);
  _currentTreeNode = treeNode;
  let nodeIndex2 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex2.push('selected');
  traverse(_treeData).set(nodeIndex2, true);

  return {treeData: _treeData, currentTreeNode: _currentTreeNode};
}

function _setTreeNodeClosed(_treeData, treeNode) {
  let nodeIndex = _getNodeIndex(_treeData, treeNode);
  nodeIndex.push('closed');
  let visible = traverse(_treeData).get(nodeIndex);
  if (typeof visible === 'undefined') visible = false;
  else visible = !visible;
  if (visible) traverse(_treeData).set(nodeIndex, true);
  else traverse(_treeData).set(nodeIndex, false);

  return {treeData: _treeData};
}

const initialTreeState = {
  treeData: [{}],
  currentTreeNode: {title: 'not selected'}
};

export default function handleActions(state = initialTreeState, action) {
  let _treeState = Object.assign({}, state);
  let treeCopy = _treeState.treeData.slice(0);
  let currentCopy = Object.assign({}, _treeState.currentTreeNode);
  switch (action.type) {
    case 'GetTreeDataDone': { return _gotTreeData(action.data); }
    case 'SelectTreeNode': { return _selectTreeNode(treeCopy, currentCopy, action.node); }
    case 'SetTreeNodeClosed': {
      let closedTreeData = _setTreeNodeClosed(treeCopy, action.node);
      return {...state, ...closedTreeData};
    }
    default: return state;
  }
}
