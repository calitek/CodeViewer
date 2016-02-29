import React from 'react';

let FileCtrlSty = {
  height: '100%',
  marginBottom: '5%',
  width: '100%'
};

export default class FileCtrl extends React.Component {
  render() {
    let htmlDivSty = {height: '100%', width: '100%'}
    if (this.props.fileData.startsWith('<pre>')) htmlDivSty.overflow = 'hidden';
    else htmlDivSty.overflow = 'auto';
    let fileHtml = {__html: this.props.fileData};
    return (
      <div id='FileCtrlSty' style={FileCtrlSty}>
        <div dangerouslySetInnerHTML={fileHtml} style={htmlDivSty}></div>
      </div>
    );
  }
}
