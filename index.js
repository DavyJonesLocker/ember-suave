/* jshint node: true */
'use strict';

var JSCSFilter = require('broccoli-jscs');
var jscsrcBuilder = require('./lib/jscsrc-builder');

module.exports = {
  name: 'ember-suave',

  lintTree: function(type, tree) {
    var jscsOptions = this.app.options.jscsOptions || {};
    jscsOptions.configPath = jscsrcBuilder(this.project);

    return new JSCSFilter(tree, jscsOptions);
  }
};
