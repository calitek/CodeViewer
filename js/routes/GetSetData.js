'use strict';

const fs = require('fs');

const Remarkable = require('remarkable');
const remark = new Remarkable();

const Highlights = require('highlights');
const highlighter = new Highlights();

const config = require('../../config.json');
let configRoot;
switch (process.platform) {
  case 'darwin': configRoot = config.darwin; break;
  case 'linux': configRoot = config.linux; break;
  case 'win32': configRoot = config.win32; break;
}
const dataRoot = configRoot.dataRoot;

module.exports.getFileData = function(event, clientData, doneCallBack) {
  function fileReadCallBack(err, data){
    if (err) doneCallBack(event, {note: 'error'});
    else {
      const inData = data.toString();
      const inFile = clientData.filePath;
      let outData;
      if (inFile.endsWith('.js')) {
        outData = highlighter.highlightSync({fileContents: inData, scopeName: 'source.js'});
      } else if (inFile.endsWith('.jsx')) {
        outData = highlighter.highlightSync({fileContents: inData, scopeName: 'source.js'});
      } else if (inFile.endsWith('.json')) {
        outData = highlighter.highlightSync({fileContents: inData, scopeName: 'source.json'});
      } else if (inFile.endsWith('.css')) {
        outData = highlighter.highlightSync({fileContents: inData, scopeName: 'source.css'});
      } else if (inFile.endsWith('.html')) {
        outData = highlighter.highlightSync({fileContents: inData, scopeName: 'text.html.basic'});
      } else {
        outData = remark.render(inData);
      }

      return doneCallBack(event, {fileData: outData});
    }
  }
  fs.readFile(clientData.filePath, fileReadCallBack);
};

module.exports.getTreeData = function(event, doneCallBack) {
  const filePath = dataRoot + '/filelist.json';
  function jsonReadCallBack(err, data){
    if (err) doneCallBack(event, 'Data readFile error ' + filePath);
    else {
      let jsonData = JSON.parse(data.toString());
      doneCallBack(event, jsonData);
    }
  }
  fs.readFile(filePath, jsonReadCallBack);
};

module.exports.setTreeData = function(data) {
  const filePath = dataRoot + '/filelist.json';
  function writeFileCallBack(err) {
    if (err) console.log('error saving Data.json file ');
  }
  fs.writeFile(filePath, JSON.stringify(data.data, null, 2), writeFileCallBack);
};
