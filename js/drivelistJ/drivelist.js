'use strict';

let os = require('os');
let parse = require('./parse');
let scripts = require('./scripts');

exports.list = (callback) => {
  let operatingSystem = os.platform();
  let script = scripts.paths[operatingSystem];
  if (script === null) throw new Error("Your OS is not supported by this module: " + operatingSystem);

  scripts.run(script, (error, output) => {
    if (error) return callback(error);
    else return callback(null, parse(output));
  });
};
