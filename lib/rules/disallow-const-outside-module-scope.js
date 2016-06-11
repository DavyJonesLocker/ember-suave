var assert = require('assert');

module.exports = function() { };

module.exports.prototype = {
  configure: function(option) {
    assert(option === true, this.getOptionName() + ' requires a true value');
  },

  getOptionName: function() {
    return 'disallowConstOutsideModuleScope';
  },

  check: function(file, errors) {
    file.iterateNodesByType(['VariableDeclaration'], function(node) {
      var parent = node.parentElement;
      if (parent.type === 'Program') {
        // declaration is in root of module
        return;
      }

      if (node.parentElement.type === 'ExportNamedDeclaration' && node.parentElement.parentElement.type === 'Program') {
        // declaration is a `export const foo = 'asdf'` in root of the module
        return;
      }

      for (var i = 0; i < node.declarations.length; i++) {
        var thisDeclaration = node.declarations[i];

        if (thisDeclaration.parentElement.kind === 'const') {
          errors.add(
            '`const` should only be used in module scope (not inside functions/blocks).',
            thisDeclaration.parentElement
          );
        }
      }
    });
  }
};
