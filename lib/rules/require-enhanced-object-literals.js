var assert = require('assert');

module.exports = function() { };

module.exports.prototype = {
  configure: function(option) {
    assert(option === true, this.getOptionName() + ' requires a true value');
  },

  getOptionName: function() {
    return 'requireEnhancedObjectLiterals';
  },

  check: function(file, errors) {
    file.iterateNodesByType('Property', function(node) {
      var propertyName = node.key.name;
      var valueName = node.value.name;
      var shorthand = node.shorthand;

      // check for non-shorthand properties
      if (propertyName === valueName && !shorthand) {
        errors.add(
          'Property assignment should use enhanced object literal function. `{ propName: propName}` is not allowed.',
          node.loc.start
        );
      }

      // check for non-method function properties
      var valueType = node.value.type;
      var valueIsMethod = node.method;
      if (valueType === 'FunctionExpression' && !valueIsMethod) {
        errors.add(
          'Property assignment should use enhanced object literal function. `{ funcName: function() {} }` is not allowed.',
          node.loc.start
        );
      }
    });
  }
};
