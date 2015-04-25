var fs = require('fs');
var path = require('path');
var temp = require('temp');
var expect = require('chai').expect;
var jscsrcBuilder = require('../lib/jscsrc-builder');

var root = process.cwd();

describe('jscsrc-builder', function() {
  afterEach(function() {
    process.chdir(root);
  });

  function readConfig(filePath) {
    var contents = fs.readFileSync(filePath, { encoding: 'utf8' });

    return JSON.parse(contents);
  }

  function testCustomConfig(config) {
    var dir = temp.mkdirSync();
    var jscsrcPath = path.join(dir, '.jscsrc');
    var jscsrcContents = JSON.stringify(config);

    fs.writeFileSync(jscsrcPath, jscsrcContents, { encoding: 'utf8' });

    process.chdir(dir);
  }

  it('returns a path to a valid file', function() {
    var configPath = jscsrcBuilder();

    expect(fs.existsSync(configPath)).to.equal(true);
  });

  it('returns a path to a .jscsrc file', function() {
    var configPath = jscsrcBuilder();
    var config = readConfig(configPath);

    expect(config.esnext).equal(true);
  });

  it('adds an additional rule glob for our custom rules', function() {
    var configPath = jscsrcBuilder();
    var config = readConfig(configPath);
    var rulesPath = path.join(__dirname, '../lib/rules', '*.js');

    expect(config.additionalRules).to.include(rulesPath);
  });

  it('merges a users jscsrc `additionalRules`', function() {
    testCustomConfig({
      additionalRules: ['foo-bar']
    });

    var configPath = jscsrcBuilder();
    var config = readConfig(configPath);

    expect(config.additionalRules).to.include('foo-bar');
  });

  it('uses a users esprima if present', function() {
    testCustomConfig({
      esprima: 'foo-bar'
    });

    var configPath = jscsrcBuilder();
    var config = readConfig(configPath);

    expect(config.esprima).to.equal('foo-bar');
  });

  it('merges a users jscsrc with the default', function() {
    testCustomConfig({
      someOtherFlag: true
    });

    var configPath = jscsrcBuilder();
    var config = readConfig(configPath);

    expect(config.someOtherFlag).equal(true);
  });

  it('a users jscsrc with a value of `null` removes the default rule', function() {
    testCustomConfig({
      esnext: null
    });

    var configPath = jscsrcBuilder();
    var config = readConfig(configPath);

    expect('esnext' in config).to.equal(false);
  });
});
