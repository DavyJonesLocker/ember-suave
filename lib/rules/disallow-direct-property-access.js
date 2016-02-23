var assert = require('assert');

function DisallowDirectPropertyAccess() { }

DisallowDirectPropertyAccess.prototype = {
  configure: function(values) {
    assert(
      Array.isArray(values),
      this.getOptionName() + ' option requires an array'
    );
    this._invalidNames = {};
    for (var i = 0, l = values.length; i < l; i++) {
      this._invalidNames[values[i]] = true;
    }
  },

  getOptionName: function() {
    return 'disallowDirectPropertyAccess';
  },

  check: function(file, errors) {
    var invalidObjectNames = this._invalidNames;
    file.iterateNodesByType('MemberExpression', function(node) {
      if (node.parentNode.type === 'AssignmentExpression') {
        // Avoid throwing the error if we're assigning to a property
        return;
      }
      var objectName = node.object.name;
      if (Object.prototype.hasOwnProperty.call(invalidObjectNames, objectName)) {
        var propertyName = node.property.name;
        errors.add(
          'Avoid accessing ' + objectName + '.' + propertyName + ' directly',
          node.loc.start);
      }
    });
  }
};

module.exports = DisallowDirectPropertyAccess;
