import React from 'react';

import TreeView from './tree.ctrl';
import FileView from './file.ctrl';

const AppCtrlSty = {
  height: '100%',
  padding: '0 10px 0 0'
};

export default () => {
  return (
    <div id="AppCtrlSty" style={AppCtrlSty}>
      <div className="FlexBox" style={{height: 'calc(100% - 20px)'}}>
        <TreeView />
        <FileView />
      </div>
    </div>
  );
};
