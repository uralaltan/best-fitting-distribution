const Math = require("mathjs");
const Distribution = require('../distribution.js');

class BinomialDistribution extends Distribution {
    calculateBinomialCoefficient(numTrials) {
        const n = numTrials;
        const k = Math.max(numTrials, 1);
        const dp = Array.from(Array(n + 1), () => Array(k + 1).fill(0));

        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= Math.min(i, k); j++) {
                if (j === 0 || j === i) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
                }
            }
        }

        return dp;
    }

    convertToBinomialDistribution(data) {
        const trials = [10, 100, 1000];
        const probabilities = [0.3, 0.5, 0.7, 0.9];

        let bestError = Number.MAX_VALUE;
        let bestFittedData = null;

        for (let i = 0; i < trials.length; i++) {
            for (let j = 0; j < probabilities.length; j++) {
                const numTrials = trials[i];
                const successProbability = probabilities[j];
                const binomialCoefficient = this.calculateBinomialCoefficient(numTrials);

                const fittedData = data.map(k => {
                    const coefficient = binomialCoefficient[numTrials][k];
                    const q = 1 - successProbability;
                    const binomialProbability = coefficient * Math.pow(successProbability, k) * Math.pow(q, numTrials - k);
                    return binomialProbability;
                });

                const error = this.calculateChiSquareError(data, fittedData);
                if (error < bestError) {
                    bestError = error;
                    bestFittedData = fittedData;
                }
            }
        }
        return bestFittedData;
    }

    calculateChiSquareError(data, fittedData) {
        let error = 0;
        for (let i = 0; i < data.length; i++) {
            error += Math.pow(data[i] - fittedData[i], 2) / fittedData[i];
        }
        return error;
    }

    generateData(numDataPoints, numTrials, successProbability) {
        const data = [];
        for (let i = 0; i < numDataPoints; i++) {
            let successes = 0;
            for (let j = 0; j < numTrials; j++) {
                if (Math.random() < successProbability) {
                    successes++;
                }
            }
            data.push(successes);
        }
        return data;
    }
}

/*

const binomialDistribution = new BinomialDistribution();

const generatedData = binomialDistribution.generateData(1000, 100, 0.5);
const convertedData = binomialDistribution.convertToBinomialDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = BinomialDistribution;