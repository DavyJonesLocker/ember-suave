'use strict';

var setupTestHooks     = require('ember-cli-blueprint-test-helpers/lib/helpers/setup');
var BlueprintHelpers   = require('ember-cli-blueprint-test-helpers/lib/helpers/blueprint-helper');
var generateAndDestroy = BlueprintHelpers.generateAndDestroy;

describe('Acceptance: ember generate and destroy ember-suave', function() {
  setupTestHooks(this);

  it('ember-suave', function() {
    return generateAndDestroy(['ember-suave'], {
      files: [
        { file: '.jscsrc', contents: ['"preset": "ember-suave"'] }
      ]
    });
  });
});
