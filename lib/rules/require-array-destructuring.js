var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
  configure: function(option) {
    assert(option === true, this.getOptionName() + ' requires a true value');
  },

  getOptionName: function() {
    return 'requireArrayDestructuring';
  },

  check: function(file, errors) {
    file.iterateNodesByType('VariableDeclaration', function(node) {

      node.declarations.forEach(function(declaration) {
        if (!declaration.init || declaration.init.type !== 'MemberExpression') {
          return;
        }

        var property = declaration.init.property || {};
        if (property.type === 'Literal' && /^\d+$/.test(property.value)) {
          errors.add('Use array destructuring', property.loc.start);
        }
      });
    });
  }
};
