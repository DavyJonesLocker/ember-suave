/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var JSCSFilter = require('broccoli-jscs');
var temp = require('temp');

temp.track();

module.exports = {
  name: 'ember-suave',

  lintTree: function(type, tree) {
    var jscsOptions = this.app.options.jscsOptions || {};
    var jscsConfig = require('./lib/jscsrc');

    var customRulePath = path.join(__dirname, 'lib', 'rules');
    jscsConfig.additionalRules = [path.join(customRulePath, '*.js')];

    var esprimaPath = require.resolve('esprima');
    jscsConfig.esprima = esprimaPath;

    var info = temp.openSync('ember-suave');
    fs.writeSync(info.fd, JSON.stringify(jscsConfig));
    fs.closeSync(info.fd);

    jscsOptions.configPath = info.path;
    return new JSCSFilter(tree, jscsOptions);
  }
};
