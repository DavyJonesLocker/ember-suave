/* jshint node: true */
'use strict';

var JSCSFilter = require('broccoli-jscs');
var jsStringEscape = require('js-string-escape');

module.exports = {
  name: 'ember-suave',

  lintTree: function(type, tree) {
    var project = this.project;
    var ui = this.ui;
    var jscsOptions = this.app.options.jscsOptions || {};
    jscsOptions.configPath = jscsOptions.configPath || '.jscsrc';

    if (!jscsOptions.testGenerator && project.generateTestFile) {
      jscsOptions.testGenerator = function(relativePath, errors) {
        var passed = !errors || errors.length === 0;

        if (errors) {
          errors = jsStringEscape('\n' + errors);
        }

        return project.generateTestFile('JSCS - ' + relativePath, [{
          name: 'should pass jscs',
          passed: passed,
          errorMessage: relativePath + ' should pass jscs.' + errors
        }]);
      };
    }

    var jscsFilter = new JSCSFilter(tree, jscsOptions);

    jscsFilter.logError = function(errorText) {
      ui.writeLine(errorText);
    };

    return jscsFilter;
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (app.tests) {
      app.import('vendor/ember-suave/qunit-configuration.js', { type: 'test' });
      app.import('vendor/ember-suave/test-loader.js', { type: 'test' });
    }
  }
};
