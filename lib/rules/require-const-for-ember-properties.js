var assert = require('assert');

function checkIdentifierError(declaration) {
  var init = declaration.init;
  return init.type === 'MemberExpression' && init.object.name === 'Ember';
}

function checkDestructuringError(declaration) {
  return declaration.init.name === 'Ember';
}

function RequireConstForEmberProperties() { }

RequireConstForEmberProperties.prototype = {
  configure: function(option) {
    assert(option === true, this.getOptionName() + ' requires a true value');
  },

  getOptionName: function() {
    return 'requireConstForEmberProperties';
  },

  check: function(file, errors) {
    file.iterateNodesByType('VariableDeclaration', function(node) {
      var declaration = node.declarations[0];
      var variableFromEmber = false;

      // Check if the variable declaration comes from Ember
      if (declaration.id.type === 'Identifier' && declaration.init) {
        variableFromEmber = checkIdentifierError(declaration, errors);
      } else if (declaration.id.type === 'ObjectPattern') {
        variableFromEmber = checkDestructuringError(declaration, errors);
      }

      if (variableFromEmber && node.kind !== 'const') {
        errors.add(
          'Always use `const` when making variables from Ember properties',
          node
        );
      }
    });
  }

};

module.exports = RequireConstForEmberProperties;
