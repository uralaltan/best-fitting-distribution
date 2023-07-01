const Math = require("mathjs");
const Distribution = require('../distribution.js');
const { jStat } = require("jstat");

class LogNormalDistribution extends Distribution {
    
    // needs a double-check!
    convert(data) {
        const logData = data.map((x) => Math.log(x));
        const meanLog = logData.reduce((acc, val) => acc + val, 0) / logData.length;
        const stdDevLog = Math.sqrt(
            logData.reduce((acc, val) => acc + Math.pow(val - meanLog, 2), 0) / logData.length
        );
        const mu = meanLog;
        const sigma = stdDevLog;
    
        const expected = data.map((x) => {
            const exponent = -Math.pow(Math.log(x) - mu, 2) / (2 * Math.pow(sigma, 2));
            const coefficient = 1 / (x * sigma * Math.sqrt(2 * Math.pi));
            return coefficient * Math.exp(exponent);
        });
        return expected;
    }

    generateData(mu, sigma, size) {       
        var randomArray = [];
        for (var i = 0; i < size; i++) {
            var randomNum = jStat.lognormal.sample(mu, sigma);
            randomArray.push(randomNum);
        }
        return randomArray;
    }
}

module.exports = LogNormalDistribution;