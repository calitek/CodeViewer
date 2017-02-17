export function selectTreeNode(node) {
  return (dispatch, getState) => {
    dispatch({type: 'SelectTreeNode', node});
    dispatch({type: 'ApiSetTreeData', data: {data: getState().treeState.treeData}});
    let currentTreeNode = getState().treeState.currentTreeNode;
    let filePath = currentTreeNode.rootpath + currentTreeNode.nodeid;
    dispatch({type: 'ApiGetFileData', data: {filePath, nodeid: currentTreeNode.nodeid}});
  };
}

export function setTreeNodeClosed(node) {
  return (dispatch, getState) => {
    dispatch({type: 'SetTreeNodeClosed', node});
    dispatch({type: 'ApiSetTreeData', data: {data: getState().treeState.treeData}});
  };
}

export function getTreeDataDone(data) {
  return (dispatch, getState) => {
    dispatch({type: 'GetTreeDataDone', data});
    dispatch({type: 'SelectTreeNode', node: getState().treeState.currentTreeNode});
  };
}
