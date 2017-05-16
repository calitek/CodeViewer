'use strict';

const execFile = require('child_process').execFile;
let path = require('path');
let scriptsPath = path.join(__dirname, '.');

exports.paths = {
  win32: path.join(scriptsPath, 'win32.bat'),
  darwin: path.join(scriptsPath, 'darwinJ.sh'),
  linux: path.join(scriptsPath, 'linux.sh')
};

exports.run = (script, callback) => {
  execFile(script, (error, stdout, stderr) => {
    if (error) return callback(error);
    else return callback(null, stdout);
  });
};
