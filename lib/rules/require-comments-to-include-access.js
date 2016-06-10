var assert = require('assert');

function isDocComment(comment) {
  return comment.value[0] === '*';
}

function includesAccessDeclaration(comment) {
  return comment.value.match(/\n(\s*\*\s+|\s*)(@private|@public|@protected)\s/);
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
    file.iterateTokensByType('CommentBlock', function(comment) {
      if (isDocComment(comment) && !includesAccessDeclaration(comment)) {
        errors.add('You must supply `@public`, `@private`, or `@protected` for block comments.', comment);
      }
    });
  }
};

module.exports = RequireCommentsToIncludeAccess;
