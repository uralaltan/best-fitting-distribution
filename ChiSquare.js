const Math = require("mathjs");

class ChiSquare {
    calculateChiSquare(distribution, observed, returnExpected=false) {
      var expected = distribution.convert(observed);
      var chiSquare = 0;
        for (let i = 0; i < observed.length; i++) {
            chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
        }
        if (returnExpected) {
          return [expected, chiSquare];
        }
        return chiSquare;
    }
  }

module.exports = ChiSquare;
