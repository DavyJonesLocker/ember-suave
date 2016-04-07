'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;

var chai = require('ember-cli-blueprint-test-helpers/chai');
var expect = chai.expect;
var file = chai.file;

describe('Acceptance: ember generate and destroy ember-suave', function() {
  setupTestHooks(this);

  it('ember-suave', function() {
    var args = ['ember-suave'];

    return emberNew()
      .then(() => emberGenerate(args))
      .then(() => {
        expect(file('.jscsrc'))
          .to.contain('"preset": "ember-suave"');
      });
  });
});
