const Math = require("mathjs");
const Distribution = require('../distribution.js');

class ExponentialDistribution extends Distribution {
    // Needs a double-check!
    convert(data) {

        const lambda = data.reduce((a, b) => a + b, 0) / data.length; // calculates mean of data

        const convertedData = data.map((value) => lambda * Math.exp(-lambda * value));

        return convertedData;
    }

    generateData(lambda, size) {
        const data = [];

        for (let i = 0; i < size; i++) {
            const rand = Math.random();
            const value = -Math.log(1 - rand) / lambda;
            data.push(value);
        }
        return data;
    }
}


module.exports = ExponentialDistribution;