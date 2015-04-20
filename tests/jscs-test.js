'use strict';

var path = require('path');
var walkSync = require('walk-sync');

var nodeTestFiles = walkSync(__dirname)
  .filter(function(file) {
    return /-test.js$/.test(file);
  })
  .map(function(file) {
    return path.join(__dirname, file);
  });

require('mocha-jscs')(['./index.js'].concat(nodeTestFiles));
