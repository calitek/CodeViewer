import lodash from 'lodash';
import traverse from 'traverse';

function _gotTreeData(treedata) {
  let _currentTreeNode = _getSelected(treedata);
  if (_currentTreeNode === null) [_currentTreeNode] = treedata;
  return { treeData: treedata, currentTreeNode: _currentTreeNode };
}

function _getSelected(tree) {
  let result = null;
  lodash.each(tree, (node) => {
    if (node.selected) result = node;
    if (result == null && node.children && node.children.length > 0) result = _getSelected(node.children);
  });
  return result;
}

function _getNodeIndex(_treeData, treeNode) {
  let treeData = _treeData;
  const nodeID = treeNode.nodeid;
  if (lodash.isEmpty(nodeID)) {
    return [];
  }

  const nodeIdArray = nodeID.split('/');
  let searchID = nodeIdArray.shift();
  const nodeIndex = [];
  let index;
  let nextSearchID;

  while (searchID) {
    if (!treeData) {
      return [];
    }
    const treeItem = lodash.find(treeData, { nodeid: searchID });
    index = lodash.indexOf(treeData, treeItem);
    if (index < 0) {
      return [];
    }
    nodeIndex.push(index);
    nextSearchID = nodeIdArray.shift();
    if (nextSearchID) {
      searchID += `/${nextSearchID}`;
      treeData = treeData[index].children;
      if (treeData) {
        nodeIndex.push('children');
      }
    } else searchID = nextSearchID;
  }

  return nodeIndex;
}

function _selectTreeNode(_treeData, _currentTreeNode, treeNode) {
  const nodeIndex1 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex1.push('selected');
  traverse(_treeData).set(nodeIndex1, false);
  _currentTreeNode = treeNode;
  const nodeIndex2 = _getNodeIndex(_treeData, _currentTreeNode);
  nodeIndex2.push('selected');
  traverse(_treeData).set(nodeIndex2, true);

  return { treeData: _treeData, currentTreeNode: _currentTreeNode };
}

function _setTreeNodeClosed(_treeData, treeNode) {
  const nodeIndex = _getNodeIndex(_treeData, treeNode);
  nodeIndex.push('closed');
  let visible = traverse(_treeData).get(nodeIndex);
  if (typeof visible === 'undefined') visible = false;
  else visible = !visible;
  if (visible) traverse(_treeData).set(nodeIndex, true);
  else traverse(_treeData).set(nodeIndex, false);

  return { treeData: _treeData };
}

const initialTreeState = {
  treeData: [],
  currentTreeNode: { title: 'not selected' },
};

export default function handleActions(state = initialTreeState, action) {
  const _treeState = Object.assign({}, state);
  const treeCopy = _treeState.treeData.slice(0);
  const currentCopy = Object.assign({}, _treeState.currentTreeNode);
  switch (action.type) {
    case 'GetTreeDataDone': {
      if (action.data) return _gotTreeData(action.data);
      return state;
    }
    case 'SelectTreeNode': {
      return _selectTreeNode(treeCopy, currentCopy, action.node);
    }
    case 'SetTreeNodeClosed': {
      const closedTreeData = _setTreeNodeClosed(treeCopy, action.node);
      return { ...state, ...closedTreeData };
    }
    default:
      return state;
  }
}
