var assert = require('assert');

function includesAccessDeclaration(comment) {
  return comment.value.match(/\n\s*(@private|@public)\s/);
}

function RequireCommentsToIncludeAccess() { }

RequireCommentsToIncludeAccess.prototype = {
  configure: function(value) {
    assert(
      value === true,
      this.getOptionName() + ' option requires a true value or should be removed'
    );
  },

  getOptionName: function() {
    return 'requireCommentsToIncludeAccess';
  },

  check: function(file, errors) {
    file.iterateTokensByType('Block', function(comment) {
      if (!includesAccessDeclaration(comment)) {
        errors.add('You must supply `@public` or `@private` for block comments.', comment.loc.start);
      }
    });
  }
};

module.exports = RequireCommentsToIncludeAccess;
