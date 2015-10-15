/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var temp = require('temp');

temp.track();

var messagesLogged = {};
function logMessage(ui, message) {
  // only log each message once, this prevents
  // duplicate messages for `app` and `tests` trees
  if (!messagesLogged[message]) {
    ui.writeLine(message);
    messagesLogged[message] = true;
  }
}

function getCustomConfig() {
  if (fs.existsSync('.jscsrc')) {
    var contents = fs.readFileSync('.jscsrc', { encoding: 'utf8' });

    return JSON.parse(contents);
  } else {
    return null;
  }
}

function getSuaveConfig() {
  // avoiding `require` (which would have worked fine)
  // to prevent mutating the cached result
  var configPath = path.join(__dirname, 'jscsrc.json');
  var contents = fs.readFileSync(configPath, { encoding: 'utf8' });

  var suaveConfig = JSON.parse(contents);
  // the rules specified there by default need to be
  // deleted, because they are specified relative to
  // ember-suave's root directory, and not the projects
  // this is later replaced with the actual node_modules
  // path
  delete suaveConfig.additionalRules;

  return suaveConfig;
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

function hasEmberSuaveCustomRules(additionalRules) {
  var regex = /\/ember-suave\/lib\/rules\/\*\.js$/;

  for (var i = 0; i < additionalRules.length; i++) {
    if (additionalRules[i].match(regex)) {
      return true;
    }
  }
  return false;
}

/*
  When using `"preset": "ember-suave"` all processing in this file is avoided, and we
  let JSCS do its normal preset processing. All other scenarios are deprecated with instructions
  are provided in the deprecation message.

  This entire file can be removed when we no longer need to support non-preset usage.

  TODO: Remove lib/jscsrc-builder.js for 2.0.0.
*/

module.exports = function(project) {
  var ui = project && project.ui || { writeLine: function() {} };
  var userConfig = getCustomConfig();
  var suaveConfig = getSuaveConfig();
  var jscsConfig, projectRoot, projectRules, customRulePath, info;

  if (userConfig) {
    if (userConfig.preset === 'ember-suave') {
      // this is the happy path and short circuits all other logic
      return '.jscsrc';
    } else {
      // when there is a `.jscsrc` but it doesn't include ember-suave as a preset
      logMessage(ui, 'Your project\'s `.jscsrc` file does not include `ember-suave` as its preset. Please add `"preset": "ember-suave"` to your `.jscsrc` file.');
    }
  } else {
    // when there is no .jscsrc file
    logMessage(ui, 'Your project does not include a `.jscsrc` file. Please generate one via `ember generate ember-suave`.');
  }

  // everything here and below is for the deprecated cases
  jscsConfig = mergeConfigs(userConfig || {}, suaveConfig);

  // Project custom rules
  projectRoot = project && project.root || process.cwd();
  projectRules = jscsConfig.additionalRules || [];
  jscsConfig.additionalRules = projectRules.map(function(rulePath) {
    return path.resolve(projectRoot, rulePath);
  });

  // Addon custom rules unless userConfig already included them
  if (!hasEmberSuaveCustomRules(jscsConfig.additionalRules)) {
    customRulePath = path.join(__dirname, 'rules');
    jscsConfig.additionalRules.push(path.join(customRulePath, '*.js'));
  }

  info = temp.openSync('ember-suave');
  fs.writeSync(info.fd, JSON.stringify(jscsConfig));
  fs.closeSync(info.fd);

  return info.path;
};

module.exports.resetMessageLoggedStatus = function() {
  messagesLogged = {};
};
