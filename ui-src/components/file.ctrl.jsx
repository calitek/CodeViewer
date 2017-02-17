import React from 'react';
import {connect} from 'react-redux';

let FileViewCtrlRenderSty = {
  backgroundColor: '#232a1f',
  color: '#ccc',
  margin: '5px 20px',
  overflow: 'auto',
  width: '100%'
};

let FileCtrlSty = {
  marginBottom: '5%',
  width: '100%'
};

function FileView({fileState}) {
  let htmlDivSty = {width: '100%'};
  if (fileState.fileData.startsWith('<pre>')) htmlDivSty.overflow = 'hidden';
  else htmlDivSty.overflow = 'auto';
  let fileHtml = {__html: fileState.fileData};
  return (
    <div id="FileViewCtrlRenderSty" style={FileViewCtrlRenderSty}>
      <div id="FileCtrlSty" style={FileCtrlSty}>
        <div dangerouslySetInnerHTML={fileHtml} style={htmlDivSty} />
      </div>
    </div>
  );
}

function mapStateToProps(store) { return {fileState: store.fileState}; }

export default connect(mapStateToProps)(FileView);
