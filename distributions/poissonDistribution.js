const Math = require("mathjs");
const { jStat } = require("jstat");
const Distribution = require('../distribution.js');

class PoissonDistribution extends Distribution {

    convert = (data) => {
    
        const simpleLinearIntegerTransformation = (data, minRange=0, maxRange=12) => {

            // Scale the data to given min-max range
            const scaledData = data.map((value) => {
                return ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * (maxRange - minRange) + minRange;
            });
            
            // Transform the data to integers
            const integerData = scaledData.map((value) => {
                return Math.round(value);
            });
            
            return integerData;
        }

        const scaledData = simpleLinearIntegerTransformation(data);

        /*

        // Using mean as estimated lambda value
        const lambda = data.reduce((a, b) => a + b, 0) / data.length; 
        
        // Output according to the poisson distribution formula
        const poissonData = scaledData.map((k) => Math.exp(-lambda) * Math.pow(lambda, k) / Math.factorial(k));

        // For future development
        // Check if Math.factorial(k) is Infinity
        // If it is return 0

        */

        return scaledData;
    }

    generateData = (size, lambda=2) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.poisson.sample(lambda);
            data.push(sampleData);
        }

        return data;;
    }
}

module.exports = PoissonDistribution;