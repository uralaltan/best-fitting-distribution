const Math = require("mathjs");
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
    
    // Box-Muller transform
    generateData(size) {
        const mu = 0; // Mean
        const sigma = 1; // Standard deviation

        const data = [];
        for (let i = 0; i < size; i++) {
            const u = 0;
            const v = 1;
            
            const x = Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.pi * Math.random());
    
            const z = Math.sqrt(v) * x + u;
            const value = sigma * z + mu;
    
            data.push(value);
        }
    
        return data;
    }
}

module.exports = NormalDistribution;