'use strict';

let _ = require('lodash');
_.str = require('underscore.string');
let yaml = require('js-yaml');

module.exports = function(input) {
  if (_.isEmpty(_.str.trim(input))) return {};
  
  return _.compact(_.map(input.split(/\n\s*\n/), function(device) {
    var result;
    device = _.chain(device).split('\n').map(function(line) {
      return line.replace(/"/g, function(match, index, string) {
        if (_.any([string.indexOf('"') === index, string.lastIndexOf('"') === index])) {
          return match;
        }
        return '\\"';
      });
    }).join('\n').value();
    result = yaml.safeLoad(device);
    
    if (_.isString(result)) return _.object([result], [null]);
    if (result === null) return;
    
    return _.mapValues(result, function(value, key) {
      if (!_.isString(value)) return value;
      return _.str.rtrim(value, ',') || null;
    });
  }));
};
