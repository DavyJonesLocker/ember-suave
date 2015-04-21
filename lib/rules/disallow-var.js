var assert = require('assert');

module.exports = function() { };

module.exports.prototype = {
  configure: function(option) {
    assert(option === true, this.getOptionName() + ' requires a true value');
  },

  getOptionName: function() {
    return 'disallowVar';
  },

  check: function(file, errors) {
    file.iterateNodesByType('VariableDeclaration', function(node) {

      for (var i = 0; i < node.declarations.length; i++) {
        var thisDeclaration = node.declarations[i];

        if (thisDeclaration.parentNode.kind === 'var') {
          errors.add(
            'Variable declarations should use `let` or `const` not `var`',
            node.loc.start
          );
        }
      }
    });
  }
};
