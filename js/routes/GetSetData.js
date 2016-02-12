'use strict';

let fs = require('fs');
let Remarkable = require('remarkable');
let hljs       = require('highlight.js');
let lodash = require('lodash');
var config = require('../../config.json');

var rootDataPath = config.macDataRoot;
if (process.platform == 'win32') rootDataPath = config.winDataRoot;

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

let getFile = function(event, clientData, doneCallBack) {
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

let getFileList = function(event, doneCallBack) {
  let filePath = rootDataPath + '/filelist.json';
  let jsonReadCallBack = function(err, data){
    if (err) doneCallBack(event, 'Data readFile error ' + filePath);
    else {
      let jsonData = JSON.parse(data.toString());
      doneCallBack(event, jsonData);
    }
  };
  fs.readFile(filePath, jsonReadCallBack);
};

let setFileList = function(data) {
  let filePath = rootDataPath + '/filelist.json';
  let writeFileCallBack = function (err) {
    if (err) console.log('error saving Data.json file ');
  };
  fs.writeFile(filePath, JSON.stringify(data, null, 2), writeFileCallBack);
};

module.exports.getFile = getFile;
module.exports.getFileList = getFileList;
module.exports.setFileList = setFileList;
