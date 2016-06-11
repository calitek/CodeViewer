'use strict';

let async = require('async');
let fs = require('fs');
let drivelist = require('../drivelistJ/drivelist');

let config = require('../../config.json');
let configRoot;
switch (process.platform) {
  case 'darwin': configRoot = config.darwin; break;
  case 'linux': configRoot = config.linux; break;
  case 'win32': configRoot = config.win32; break;
}
let readRoot = configRoot.readRoot;
let readRootLength = readRoot.length;
let dataRoot = configRoot.dataRoot;

function getOrderedFileList(fileList, listFolder) {
  let dirs = [];
  function sep(element, index, array) {
    if (!listFolder.endsWith('/')) listFolder += '/';
    let filePath = listFolder + element;
    try {
      if (fs.statSync(filePath).isDirectory()) dirs.push(element);
    } catch(e) {}
  }
  fileList.forEach(sep);
  let outDir = dirs.sort();
  // console.log('outDir: ', outDir);
  return outDir;
}

function readDirTree(event, readTreeDone) {

  let isDirOk = function(fileName, filePath) {
    let returnIt;
    switch (fileName) {
      case 'node_modules':
      case 'com.apple.TCC':
      case 'ApplePushService':
      case 'Caches':
      case 'private':
      case 'authserver':
      case 'Library':
      case 'ParentalControls':
      case 'ui-dist':
      case '.git': returnIt = false; break;
      default: returnIt = true;
    }
    returnIt = fileName.startsWith('.') ? false : returnIt;
    returnIt = fileName.startsWith('/') ? false : returnIt;
    returnIt = fileName.endsWith('.app') ? false : returnIt;
    returnIt = fileName.endsWith('.backupdb') ? false : returnIt;
    return returnIt;
  };

  let getFileList = function(listFolder, getFileListDoneCB) {
    let fileListReturned = [];

    let eachFileNameAction = function(fileName, eachFileNameDoneCB) {
      let filePath = listFolder + fileName;
      let addToList = function(newRecord) {
        fileListReturned.push(newRecord);
        return eachFileNameDoneCB();
      };

      try {
        fs.stat(filePath, function (err, stats) {
          if (err) return eachFileNameDoneCB();
          let relPath = listFolder.substr(readRootLength);
          let nodeid = relPath + fileName;
          let currentRecord = {
            children: [],
            nodeid: nodeid,
            rootpath: readRoot,
            selected: false,
            title: fileName
          };
          let handleDirReturn = function(dirList) {
            currentRecord.children = dirList;
            currentRecord.closed = true;
            addToList(currentRecord);
          };
          if (err) throw err;
          else if (stats.isDirectory()) {
            if (isDirOk(fileName)) {
              getFileList(filePath + '/', handleDirReturn);
            }
            else return eachFileNameDoneCB();
          }
          else return eachFileNameDoneCB();
        });
      } catch(e) {
        return eachFileNameDoneCB();
      }
    };

    let eachFileNameActionDone = function(err) {
      if (err) console.log('eachFileNameActionDone error');
      else getFileListDoneCB(fileListReturned);
    };

    let getFileListCallBack = function(err, fileList) {
      if (err) console.log('getFileListCallBack error: ' + listFolder);
      else {
        let orderedFileList = getOrderedFileList(fileList, listFolder);
        async.eachSeries(orderedFileList, eachFileNameAction, eachFileNameActionDone);
      }
    };

    let start = function() { fs.readdir(listFolder, getFileListCallBack); };

    start();
  };

  let getFileListDone = function(fileList) {
    let filePath = dataRoot + '/dirlist.json';
    let writeFileCallBack = function (err) {
      if (err) console.log('error saving fileList');
      console.log('dirList saved');
      return readTreeDone(event);
    };
    fs.writeFile(filePath, JSON.stringify(fileList, null, 2), writeFileCallBack);
  };
  
  let saveList = [];
  let disksForEach = function(disk, disksForEachDone) {
    if (disk.description === 'Mini-itx2t') {
      let listFolder = disk.mountpoint;
      if (!listFolder.endsWith('/')) listFolder += '/';
      readRoot = listFolder;
      readRootLength = readRoot.length;
      getFileList(listFolder, function(filelist) {
        if (filelist.length === 0) { console.log('filelist empty!'); }
        let currentRecord = {
          children: filelist,
          nodeid: disk.description,
          rootpath: listFolder,
          selected: false,
          title: disk.description
        };
        console.log('currentRecord: ', currentRecord);
        saveList.push(currentRecord);
        return disksForEachDone();
      });
    } else {return disksForEachDone();}
  };

  drivelist.list(function(error, disks) {
    if (error) throw error;
    async.eachSeries(disks, disksForEach, function() {getFileListDone(saveList);});
  });
}

readDirTree(null, function() { console.log('readDirTree done!'); });
drivelist.list(function(error, disks) {
  if (error) throw error;
  disks.forEach(function(disk) {
    console.log('mountpoint: ', disk.mountpoint);
    console.log('description: ', disk.description);
  });
});

// module.exports.readTree = readTree;
    // if (disk.description !== undefined) {
    
