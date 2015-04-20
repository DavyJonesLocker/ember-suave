/* jshint node: true */
'use strict';

var path = require('path');
var JSCSFilter = require('broccoli-jscs');

module.exports = {
  name: 'ember-suave',

  lintTree: function(type, tree) {
    var jscsOptions = this.app.options.jscsOptions || {};
    jscsOptions.configPath = path.join(__dirname, 'lib', 'jscsrc.json');

    return new JSCSFilter(tree, jscsOptions);
  }
};
