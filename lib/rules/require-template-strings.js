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

        if (otherToken.type === 'Punctuator' &&
            otherToken.value === '+' &&
            otherToken.loc.start.line === token.loc.start.line &&
            nextToken.loc.start.line === token.loc.start.line
           ) {

          errors.add(
            "Using manual concatenation with strings is not allowed",
            otherToken.loc.start
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
