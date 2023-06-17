const Math = require("mathjs");

class BinomialDistribution {
    constructor(numTrials, successProbability=0.5) {
        this.trials = numTrials;
        this.probability = successProbability;
        this.binomialCoefficient = this.calculateBinomialCoefficient();
    }

    calculateBinomialCoefficient() {
        const n = this.trials;
        const k = Math.max(this.trials, 1);
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
        const probabilities = data.map(k => {
            const coefficient = this.binomialCoefficient[this.trials][k];
            const q = 1 - this.probability;
            const binomialProbability = coefficient * Math.pow(this.probability, k) * Math.pow(q, this.trials - k);
            return binomialProbability;
        });
        return probabilities;
    }

    generateData(numDataPoints) {
        const data = [];
        for (let i = 0; i < numDataPoints; i++) {
            let successes = 0;
            for (let j = 0; j < this.trials; j++) {
                if (Math.random() < this.probability) {
                    successes++;
                }
            }
            data.push(successes);
        }
        return data;
    }
}

/*

const binomialDistribution = new BinomialDistribution(numTrials=10, successProbability=0.5);

const generatedData = binomialDistribution.generateData(1000);
const convertedData = binomialDistribution.convertToBinomialDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = BinomialDistribution;