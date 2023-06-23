const Math = require("mathjs");
const { jStat } = require("jstat");
const Distribution = require('../distribution.js');

class ExponentialDistribution extends Distribution {
    // Needs a double-check!
    convert(data) {

        const mean = data.reduce((a, b) => a + b, 0) / data.length; // calculates mean of data
        const lambda = 1 / mean;

        const convertedData = data.map((value) => lambda * Math.exp(-lambda * value));

        return convertedData;
    }

    generateData(lambda, size) {
        var randomArray = [];
        for (var i = 0; i < size; i++) {
            var randomNum = jStat.exponential.sample(lambda);
            randomArray.push(randomNum);
        }
        return randomArray;
    }
}


module.exports = ExponentialDistribution;