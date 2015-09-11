/* globals jQuery, QUnit */

jQuery(document).ready(function () {
  var TestLoaderModule = require('ember-cli/test-loader');
  var addModuleExcludeMatcher = TestLoaderModule['addModuleExcludeMatcher'];

  function isJscsDisabled() { return QUnit ? QUnit.urlParams.nojscs : false; }
  function isAJscsTest(moduleName) { return moduleName.match(/\.jscs-test$/); }
  function jscsModuleMatcher(moduleName) { return isJscsDisabled() && isAJscsTest(moduleName); }

  if (addModuleExcludeMatcher) {
    addModuleExcludeMatcher(jscsModuleMatcher);
  }

});
