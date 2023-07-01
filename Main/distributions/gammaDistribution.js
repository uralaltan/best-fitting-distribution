const Math = require("mathjs");
const { jStat } = require("jstat");
const Distribution = require('../distribution.js');

class GammaDistribution extends Distribution {
    
    convert = (data, returnOutput=false) => {

        const simpleLinearTransformation = (data, minRange=0.1, maxRange=15.5) => {

            // Scale the data to given min-max range
            const scaledData = data.map((value) => {
                return ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * (maxRange - minRange) + minRange;
            });

            return scaledData;
        }

        const factorial = (n) => {
            if (n <= 1) {
                return 1;
            }
            return n * factorial(n - 1);
        };

        const scaledData = simpleLinearTransformation(data);

        if (returnOutput) {

            // Calculate gamma distribution
            const mean = scaledData.reduce((sum, value) => sum + value, 0) / scaledData.length;
            const variance = scaledData.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / scaledData.length;

            const alpha = Math.pow(mean, 2) / variance;
            const beta = mean / variance;
            
            // const shape = alpha; 
            // const scale = 1 / beta;
        
            const gammaData = scaledData.map(value => Math.gamma(alpha) * Math.pow(beta, alpha) * Math.pow(value, alpha - 1) * Math.exp(-beta * value));

            return gammaData;
        }

        // Return converted gamma distribution data
        return scaledData;
    }

    generateData = (size, shape, scale) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.gamma.sample(shape, scale);
            data.push(sampleData);
        }

        return data;
    }
}

module.exports = GammaDistribution;