'use strict';

var walkSync = require('walk-sync');
var execFile = require("child_process").execFile;

var nodeTestFiles = walkSync('.', { globs: ['{lib,blueprints,tests}/**/*.js'] })
  .filter(function(file) {
    return /.js$/.test(file);
  })
  .filter(function(file) {
    return !/node_modules|tmp/.test(file);
  })
  .filter(function(file) {
    return !/tests\/fixtures\//.test(file);
  });

describe('jscs', function () {
  nodeTestFiles.forEach(function(path) {

    it("should pass for " + path, function (done) {
      var error = new Error('');

      execFile(
        require.resolve('jscs/bin/jscs'),
        [path, '--verbose', '--config', '.repo-jscsrc'],
        onProcessFinished
      );

      function onProcessFinished (_, stdout) {
        if (_) {
          error.stack = stdout;
          throw error;
        } else {
          done();
        }
      }
    });
  });
});
