var fs = require('fs');
var path = require('path');
var broccoli = require('broccoli');
var walkSync = require('walk-sync');
var expect = require('chai').expect;
var suaveLintTree = require('../index').lintTree;

describe('rules tests', function() {
  var fixturePath = path.join(__dirname, 'fixtures');
  var jscsrcPath = path.join(fixturePath, '.jscsrc');
  var builder;

  beforeEach(function() {
    this.lintTree = suaveLintTree;
    this.app = { options: { jscsOptions: { configPath: jscsrcPath } } };
    this.ui = { writeLine: function() {} };
    this.project = {};
  });

  afterEach(function() {
    if (builder) {
      return builder.cleanup();
    }
  });

  var rules = fs.readdirSync(path.join(fixturePath, 'rules'));

  rules.forEach(function(dir) {
    describe(dir, function() {
      it('good files should pass', function() {
        var rulePath = path.join(fixturePath, 'rules', dir, 'good');

        return checkJSCSRules(this.lintTree('test', rulePath), function(contents) {
          expect(contents).to.include('ok(true');
          expect(contents).to.not.include('ok(false');
        });
      });

      it('bad files should fail', function() {
        var rulePath = path.join(fixturePath, 'rules', dir, 'bad');

        return checkJSCSRules(this.lintTree('test', rulePath), function(contents) {
          expect(contents).to.not.include('ok(true');
          expect(contents).to.include('ok(false');
        });
      });
    });
  });

  describe('regressions', function() {
    var regressionDirs = fs.readdirSync(path.join(fixturePath, 'regressions'));

    regressionDirs.forEach(function(dir) {
      it(dir + ' should pass', function() {
        var rulePath = path.join(fixturePath, 'regressions', dir);

        return checkJSCSRules(this.lintTree('test', rulePath), function(contents) {
          expect(contents).to.not.include('ok(false');
          expect(contents).to.include('ok(true');
        });
      });
    });
  });

  function checkJSCSRules(tree, callback) {
    var builder = new broccoli.Builder(tree);

    return builder.build()
      .then(function(result) {
        var outputPath = result.directory;

        var files = walkSync(outputPath)
          .filter(function(file) {
            return /jscs-test.js$/.test(file);
          });

        files.forEach(function(file) {
          var contents = fs.readFileSync(path.join(outputPath, file), { encoding: 'utf8' });

          callback(contents);
        });
      });
  }
});
