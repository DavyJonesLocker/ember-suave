/* globals requirejs, jQuery, QUnit */

jQuery(document).ready(function () {
  var testLoaderModulePath = 'ember-cli-test-loader/test-support/index';
  if (!requirejs.entries[testLoaderModulePath]) {
    testLoaderModulePath = 'ember-cli/test-loader';
  }

  var TestLoaderModule = require(testLoaderModulePath);
  var addModuleExcludeMatcher = TestLoaderModule['addModuleExcludeMatcher'];

  function isJscsDisabled() { return typeof QUnit === 'undefined' ? false : QUnit.urlParams.nojscs; }
  function isAJscsTest(moduleName) { return moduleName.match(/\.jscs-test$/); }
  function jscsModuleMatcher(moduleName) { return isJscsDisabled() && isAJscsTest(moduleName); }

  if (addModuleExcludeMatcher) {
    addModuleExcludeMatcher(jscsModuleMatcher);
  }

});
