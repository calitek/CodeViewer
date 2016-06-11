'use strict';

let fs = require('fs');
let Remarkable = require('remarkable');
let hljs       = require('highlight.js');
let lodash = require('lodash');
let config = require('../../config.json');

let configRoot;
switch (process.platform) {
  case 'darwin': configRoot = config.darwin; break;
  case 'linux': configRoot = config.linux; break;
  case 'win32': configRoot = config.win32; break;
}
let dataRoot = configRoot.dataRoot;

let md = new Remarkable({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return '';
  }
});

module.exports.getFile = function(event, clientData, doneCallBack) {
  let fileReadCallBack = function(err, data){
    if (err) doneCallBack(event, {note: 'error'});
    else {
      let inData = data.toString();
      let inFile = clientData.filePath;
      if (inFile.endsWith('.js') || inFile.endsWith('.json') || inFile.endsWith('.css')) {
        inData = '``` javascript\n' + inData + '```';
      }

      let outData = md.render(inData);
      return doneCallBack(event, {fileData: outData});
    }
  };
  fs.readFile(clientData.filePath, fileReadCallBack);
};

module.exports.getFileList = function(event, doneCallBack) {
  let filePath = dataRoot + '/filelist.json';
  let jsonReadCallBack = function(err, data){
    if (err) doneCallBack(event, 'Data readFile error ' + filePath);
    else {
      let jsonData = JSON.parse(data.toString());
      doneCallBack(event, jsonData);
    }
  };
  fs.readFile(filePath, jsonReadCallBack);
};

module.exports.setFileList = function(data) {
  let filePath = dataRoot + '/filelist.json';
  let writeFileCallBack = function (err) {
    if (err) console.log('error saving Data.json file ');
  };
  fs.writeFile(filePath, JSON.stringify(data, null, 2), writeFileCallBack);
};
