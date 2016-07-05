import React from 'react';

import Actions from './../../actions/api.Actions';
import TreeList from './tree.list';
import JButton from './../common/jButton';

import FileListStore from './../../stores/FileList.Store';

let TreeCtrlRenderSty = {
  height: 'calc(100% - 19px)',
  maxWidth: '40%',
  overflowX: 'auto',
  minWidth: '25%'
};

let readTreeBtn = { buttonid: "readTree", text: "Read Tree" };

class TreeCtrlRender extends React.Component {
   render() {
    return (
      <div id='TreeCtrlRenderSty' style={TreeCtrlRenderSty}>
        <JButton btn={readTreeBtn} parentClickHandler={this.clickHandler} />
        <TreeList data={this.state.treeData.data} />
      </div>
    );
  }
}

function getState() { return {treeData: FileListStore.getTreeData()}; }

export default class TreeView extends TreeCtrlRender {
  state = getState();

  clickHandler = () => { Actions.apiReadTree(); };
  componentDidMount = () => { this.unsubscribe = FileListStore.listen(this.storeDidChange); };
  componentWillUnmount = () => { this.unsubscribe(); };
  storeDidChange = () => { this.setState(getState()); };
}
