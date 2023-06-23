const Math = require("mathjs");
const { jStat } = require("jstat");
const Distribution = require('../distribution.js');

class GammaDistribution extends Distribution {
    
    // might comeback to this but looks solid for now.
    convert(data) {

        const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
        const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;

        const alpha = mean * ((mean * (1 - mean)) / variance - 1);
        const beta = (1 - mean) * ((mean * (1 - mean)) / variance - 1);

        const shape = alpha; 
        const scale = 1/beta;

        const factorial = (n) => {
                    if (n === 0 || n === 1) {
                    return 1;
                    } else {
                    let result = 1;
                    for (let i = 2; i <= n; i++) {
                        result *= i;
                    }
                    return result;
                   }
                }
        
        const expected = data.map((x) => {
            return (Math.pow(x, shape - 1) * Math.exp(-x / scale)) /
                   (Math.pow(scale, shape) * factorial(shape - 1));
        });

        return expected;

    }
  
    generateData(shape, scale, size) {
        var randomArray = [];
        for (var i = 0; i < size; i++) {
            var randomNum = jStat.gamma.sample(shape, scale);
            randomArray.push(randomNum);
        }
        return randomArray;
    }
}

module.exports = GammaDistribution;