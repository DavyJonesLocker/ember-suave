var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

  configure: function(options) {
    assert(
      options === true,
      this.getOptionName() + ' option requires a true value or should be removed'
    );
  },

  getOptionName: function() {
    return 'requireTemplateStringsForConcatenation';
  },

  check: function(file, errors) {
    file.iterateTokensByType('String', function(token) {
      function assertIfTokenIsPlus(otherToken) {
        var nextToken = file.getNextToken(otherToken);

        if (!otherToken || !nextToken) {
          // there is no next or previous node
          return;
        }

        if (otherToken.type === 'Punctuator' &&
            otherToken.value === '+' &&
            otherToken.getLoc().start.line === token.getLoc().start.line &&
            nextToken.getLoc().start.line === token.getLoc().start.line
           ) {

          errors.add(
            "Using manual concatenation with strings is not allowed",
            otherToken
          );
        }
      }

      var nextToken = file.getNextToken(token);
      var previousToken = file.getPrevToken(token);

      assertIfTokenIsPlus(previousToken);
      assertIfTokenIsPlus(nextToken);
    });
  }

};
