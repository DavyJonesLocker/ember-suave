/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var temp = require('temp');

temp.track();

function getCustomConfig() {
  if (fs.existsSync('.jscsrc')) {
    var contents = fs.readFileSync('.jscsrc', { encoding: 'utf8' });

    return JSON.parse(contents);
  } else {
    return {};
  }
}

function mergeConfigs(userConfig, suaveConfig) {
  var config = {};
  var keys, index, length, key, value;

  keys = Object.keys(suaveConfig);
  for (index = 0, length = keys.length; index < length; index++) {
    key = keys[index];

    config[key] = suaveConfig[key];
  }

  keys = Object.keys(userConfig);
  for (index = 0, length = keys.length; index < length; index++) {
    key = keys[index];
    value = userConfig[key];

    if (value === null) {
      delete config[key];
    } else {
      config[key] = value;
    }
  }

  return config;
}

module.exports = function(project) {
  var userConfig = getCustomConfig();
  var suaveConfig = require('./jscsrc');

  var jscsConfig = mergeConfigs(userConfig, suaveConfig);

  // Project custom rules
  var projectRoot = project && project.root || process.cwd();
  var projectRules = jscsConfig.additionalRules || [];
  jscsConfig.additionalRules = projectRules.map(function(rulePath) {
    return path.resolve(projectRoot, rulePath);
  });

  // Addon custom rules
  var customRulePath = path.join(__dirname, 'rules');
  jscsConfig.additionalRules.push(path.join(customRulePath, '*.js'));

  var info = temp.openSync('ember-suave');
  fs.writeSync(info.fd, JSON.stringify(jscsConfig));
  fs.closeSync(info.fd);

  return info.path;
};
