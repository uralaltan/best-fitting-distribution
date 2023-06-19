const Math = require("mathjs");
const Distribution = require('../distribution.js');

class NegativeBinomialDistribution extends Distribution {
    convertToNegativeBinomialDistribution(data, successesRequired, probabilityOfSuccess) {
        const binomialCoefficient = (n, k) => {
            let coefficient = 1;
            for (let i = 0; i < k; i++) {
                coefficient *= (n - i) / (i + 1);
            }
            return coefficient;
        };

        const expected = data.map((x) => {
            const probability =
                Math.pow(probabilityOfSuccess, successesRequired) * Math.pow(1 - probabilityOfSuccess, x - successesRequired);
            const coefficient = binomialCoefficient(x - 1, successesRequired - 1);
            return coefficient * probability;
        });
        return expected;
    }

    generateData(size, successesRequired, probabilityOfSuccess) {
        let data = [];
        for (let i = 0; i < size; i++) {
            let count = 0;
            let trials = 0;

            while (count < successesRequired) {
                let random = Math.random();
                if (random < probabilityOfSuccess) {
                    count++;
                }
                trials++;
            }
            data.push(trials - successesRequired);
        }
        return data;
    }
}

/*

const negativeBinomialDistribution = new NegativeBinomialDistribution();

const generatedData = negativeBinomialDistribution.generateData(size=50, successesRequired=5, probabilityOfSuccess=0.5);
const convertedData = negativeBinomialDistribution.convertToNegativeBinomialDistribution(generatedData, 5, 0.5);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = NegativeBinomialDistribution;