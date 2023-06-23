const Math = require("mathjs");
const gaussian = require('gaussian');
const Distribution = require('../distribution.js');

class NormalDistribution extends Distribution {
    
    convert(data) {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
        const stdDev = Math.sqrt(variance);
    
        const normalData = [];
        for (let i = 0; i < data.length; i++) {
            const ithNumber = Math.exp(Math.square((data[i] - mean) / stdDev) / (-2)) / (stdDev * Math.sqrt(2 * Math.pi));
            normalData.push(ithNumber);
        }
        return normalData;
    }
    
    generateData(size, mean, variance) {
        const distribution = gaussian(mean, variance);
        const data = distribution.random(size);
        return data; 
    }

}

module.exports = NormalDistribution;