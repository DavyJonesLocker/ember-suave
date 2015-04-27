var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
  configure: function(option) {
    var isTrue = option === true;

    assert(
      isTrue || (typeof option === 'object' && Array.isArray(option.allExcept)),
      this.getOptionName() + ' requires the value `true` ' +
        'or an object with an `allExcept` array property'
    );

    this._propertyExceptions = !isTrue && option.allExcept || [];
  },

  getOptionName: function() {
    return 'requireObjectDestructuring';
  },

  check: function(file, errors) {
    var propertyExceptions = this._propertyExceptions;

    file.iterateNodesByType('VariableDeclaration', function(node) {

      node.declarations.forEach(function(declaration) {
        if (!declaration.init || declaration.init.type !== 'MemberExpression') {
          return;
        }

        var variable = declaration.id || {};
        var property = declaration.init.property || {};

        if (variable.name === property.name &&
            propertyExceptions.indexOf(variable.name) < 0) {

          errors.add('Property assignments should use destructuring', node.loc.start);
        }
      });
    });
  }
};
