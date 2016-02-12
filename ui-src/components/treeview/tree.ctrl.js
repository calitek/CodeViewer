import React from 'react';

import Actions from './../../actions/api.Actions';
import TreeList from './tree.list';
import JButton from './../common/jButton';

import FileListStore from './../../stores/FileList.Store';

let TreeCtrlRenderSty = {
  height: 'calc(100% - 19px)',
  maxWidth: '300px',
  width: '25%'
};

let readTreeBtn = { buttonid: "readTree", text: "Read Tree" };

class TreeCtrlRender extends React.Component {
   render() {
    return (
      <div id='TreeCtrlRenderSty' style={TreeCtrlRenderSty}>
        <JButton btn={readTreeBtn} parentClickHandler={this.clickHandler} />
        <TreeList data={this.state.treeData} currentTreeNode={this.state.currentTreeNode} />
      </div>
    );
  }
}

function getState() {
  return {
    treeData: FileListStore.getFileList(),
    currentTreeNode: FileListStore.getCurrentTreeNode()
  };
}

export default class TreeCtrl extends TreeCtrlRender {
  constructor() {
    super();
    this.state = getState();
  }

  clickHandler = () => { Actions.apiReadTree(); };
  componentDidMount = () => { this.unsubscribe = FileListStore.listen(this.storeDidChange); };
  componentWillUnmount = () => { this.unsubscribe(); };
  storeDidChange = () => { this.setState(getState()); };
}
