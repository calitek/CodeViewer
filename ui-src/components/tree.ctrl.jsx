import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectTreeNode, setTreeNodeClosed} from '../store/tree/tree.Actions';
import {apiReadTree} from '../store/api/api.Actions';
import TreeView from './common/jTreeView';
import JButton from './common/jButton';

const TreeCtrlRenderSty = {
  height: 'calc(100% - 19px)',
  overflowX: 'auto',
  width: '350px'
};

const options = {
  icon: {sun: 'dev', leaf: 'home', snow: 'sys'},
  typeName: ['node', 'type']
};

let readTreeBtn = {buttonid: 'readTree', text: 'Read Tree'};

class TreeCtrl extends React.Component {
  iconHandler = (node) => { this.props.setTreeNodeClosed(node); };
  clickHandler = (node) => { this.props.selectTreeNode(node); };
  readTreeHandler = () => { this.props.apiReadTree(); };
  render() {
    return (
      <div id="TreeCtrlRenderSty" style={TreeCtrlRenderSty}>
        <JButton btn={readTreeBtn} parentClickHandler={this.readTreeHandler} />
        <TreeView
          data={this.props.treeState.treeData}
          options={options}
          iconClick={this.iconHandler}
          titleClick={this.clickHandler}
        />
      </div>
    );
  }
}

function mapStateToProps(store) { return {treeState: store.treeState}; }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectTreeNode, setTreeNodeClosed, apiReadTree}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeCtrl);
