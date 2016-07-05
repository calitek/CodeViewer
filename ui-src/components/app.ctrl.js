import React from 'react';

import TreeView from './treeview/tree.ctrl';
import FileView from './fileview.ctrl';

let AppCtrlSty = {
  height: '100%',
  padding: '0 10px 0 0'
}

export default class AppCtrl extends React.Component {
   render() {
    return (
      <div id='AppCtrlSty' style={AppCtrlSty}>
        <div className='FlexBox' style={{height: 'calc(100% - 20px)'}}>
          <TreeView />
          <FileView />
        </div>
      </div>
    );
  }
}
