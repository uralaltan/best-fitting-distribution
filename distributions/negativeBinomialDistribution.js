const Math = require("mathjs");

class NegativeBinomialDistribution {
    constructor(successesRequired, probabilityOfSuccess=0.5) {
        this.successes = successesRequired;
        this.probability = probabilityOfSuccess;
    }

    convertToNegativeBinomialDistribution(data) {
        const binomialCoefficient = (n, k) => {
            let coefficient = 1;
            for (let i = 0; i < k; i++) {
                coefficient *= (n - i) / (i + 1);
            }
            return coefficient;
        };
    
        const expected = data.map((x) => {
            const probability =
            Math.pow(this.probability, this.successes) * Math.pow(1 - this.probability, x - this.successes);
            const coefficient = binomialCoefficient(x - 1, this.successes - 1);
            return coefficient * probability;
        });
        return expected;
    }

    generateData(size) {
        let data = [];
        for (let i = 0; i < size; i++) {
            let count = 0;
            let trials = 0;
        
            while (count < this.successes) {
                let random = Math.random();
                if (random < this.probability) {
                    count++;
                }
                    trials++;
            }
            data.push(trials - this.successes);
        }
        return data;
    }
}

/*

const negativeBinomialDistribution = new NegativeBinomialDistribution(successesRequired=5, probabilityOfSuccess=0.5);

const generatedData = negativeBinomialDistribution.generateData(size=50);
const convertedData = negativeBinomialDistribution.convertToNegativeBinomialDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = NegativeBinomialDistribution;