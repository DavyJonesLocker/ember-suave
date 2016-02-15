/* jshint node: true */
'use strict';

var JSCSFilter = require('broccoli-jscs');

module.exports = {
  name: 'ember-suave',

  lintTree: function(type, tree) {
    var ui = this.ui;
    var jscsOptions = this.app.options.jscsOptions || {};
    jscsOptions.configPath = jscsOptions.configPath || '.jscsrc';

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
