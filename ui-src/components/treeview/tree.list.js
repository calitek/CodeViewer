import React from 'react';

import Actions from '../../actions/fl.Actions';
import TreeView from './../common/jTreeView';

export default class TreeList extends React.Component {
  iconHandler = (node) => { Actions.setTreeNodeClosed(node); };
  clickHandler = (node) => { Actions.selectTreeNode(node); };
  render() {
    let options = {
      icon: {sun: 'dev', leaf: 'home', snow: 'sys'},
      typeName: ['node', 'type']
    };
    return (
      <div>
        <TreeView
          data={this.props.data}
          options={options}
          iconClick={this.iconHandler}
          titleClick={this.clickHandler}
        />
      </div>
    );
  }
}
