import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {selectTreeNode, setTreeNodeClosed} from '../store/tree/tree.Actions';
import {apiReadTree} from '../store/api/api.Actions';
import {JButton, JTreeView} from 'jms-react-components';

const TreeCtrlSty = {
  flexGrow: '1',
  height: 'calc(100% - 19px)',
  overflowX: 'auto',
  resize: 'horizontal',
  width: '350px'
};

const options = {
  icon: {sun: 'dev', leaf: 'home', snow: 'sys'},
  typeName: ['node', 'type']
};

let readTreeBtn = {buttonid: 'readTree', text: 'Read Tree'};

const TreeCtrl = (props) => {
  const iconHandler = (node) => { props.setTreeNodeClosed(node); };
  const clickHandler = (node) => { props.selectTreeNode(node); };
  const readTreeHandler = () => { props.apiReadTree(); };
  return (
    <div id="TreeCtrl" style={TreeCtrlSty}>
      <JButton btn={readTreeBtn} parentClickHandler={readTreeHandler} />
      <JTreeView
        data={props.treeState.treeData}
        options={options}
        iconClick={iconHandler}
        titleClick={clickHandler}
      />
    </div>
  );
};

function mapStateToProps(store) { return {treeState: store.treeState}; }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectTreeNode, setTreeNodeClosed, apiReadTree}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeCtrl);
