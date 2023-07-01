const Math = require("mathjs");
const gaussian = require('gaussian');
const Distribution = require('../distribution.js');

class NormalDistribution extends Distribution {
    
    convert(data) {

        const mean = data.reduce((a, b) => a + b, 0) / data.length;

        const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
        const stdDev = Math.sqrt(variance);

        const normalData = data.map(num => (num - mean) / stdDev)
        return normalData;
    }
    
    generateData(size) {

        const mean = 0;
        const varience = 1;

        const distribution = gaussian(mean, varience);
        const data = distribution.random(size);

        return data; 
    }

}

module.exports = NormalDistribution;