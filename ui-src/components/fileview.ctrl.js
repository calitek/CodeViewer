import React from 'react';

import FileCtrl from './file.ctrl';

import FileViewStore from '../stores/FileView.Store';

let FileViewCtrlRenderSty = {
  height: '100%',
  margin: '5px 20px',
  width: '75%'
};

class FileViewCtrlRender extends React.Component {
   render() {
    return (
      <div id='FileViewCtrlRenderSty' style={FileViewCtrlRenderSty}>
        <FileCtrl fileData={this.state.fileData}/>
      </div>
    );
  }
}

function getState() {
  return {
    fileData: FileViewStore.getFile(),
  };
}

export default class FileViewCtrl extends FileViewCtrlRender {
  constructor() {
    super();
    this.state = getState();
  }

  componentDidMount = () => { this.unsubscribe = FileViewStore.listen(this.storeDidChange); };
  componentWillUnmount = () => { this.unsubscribe(); };
  storeDidChange = (id) => {
    switch (id) {
      case 'fileData': this.setState({fileData: FileViewStore.getFile()}); break;
      default: this.setState(getState());
    }
  };
}
