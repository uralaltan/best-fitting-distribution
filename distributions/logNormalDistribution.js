const Math = require("mathjs");

class LogNormalDistribution {
    convertToLogNormalDistribution(data) {
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
        const data = [];
        for (let i = 0; i < size; i++) {
            const randomValue = Math.exp(mu + sigma * this.randomNormalDistribution());
            data.push(randomValue);
        }
        return data;
    }
    
    randomNormalDistribution() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); // Ensure u is not zero
        while (v === 0) v = Math.random(); // Ensure v is not zero
    
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.pi * v);
        return z;
    }
}

/*

const logNormalDistribution = new LogNormalDistribution();

const generatedData = logNormalDistribution.generateData(mu=0, sigma=0.25, size=50);
const convertedData = logNormalDistribution.convertToLogNormalDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = LogNormalDistribution;