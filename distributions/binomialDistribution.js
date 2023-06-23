const Math = require("mathjs");
const Distribution = require('../distribution.js');

class BinomialDistribution extends Distribution {
    // TODO
    convert(data) {
        return data;
    }


    generateData(numDataPoints, numTrials, successProbability) {
        const data = [];
        for (let i = 0; i < numDataPoints; i++) {
            let successes = 0;
            for (let j = 0; j < numTrials; j++) {
                if (Math.random() < successProbability) {
                    successes++;
                }
            }
            data.push(successes);
        }
        return data;
    }
}

module.exports = BinomialDistribution;