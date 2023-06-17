const Math = require("mathjs");

class ExponentialDistribution {
    convertToExponentialDistribution(data) {
        const lambdas = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0];
        let bestLambda = null;
        let lowestChiSquare = Infinity;
        let bestExpected = null;
    
        for (let lambda of lambdas) {
            const expected = data.map((x) => {
                return lambda * Math.exp(-lambda * x);
            });
    
            const chiSquare = this.calculateChiSquare(data, expected);
    
            if (chiSquare < lowestChiSquare) {
                lowestChiSquare = chiSquare;
                bestLambda = lambda;
                bestExpected = expected;
            }
        }
        console.log("Exponential Distribution Best Lambda: ", bestLambda);
        return bestExpected;
    }

    calculateChiSquare(observed, expected) {
        let chiSquare = 0;
        for (let i = 0; i < observed.length; i++) {
            chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
        }
        return chiSquare;
    }

    generateData(lambda, size) {
        const data = [];

        for (let i = 0; i < size; i++) {
            const rand = Math.random();
            const value = -Math.log(1 - rand) / lambda;
            data.push(value);
        }
        return data;
    }
}

/*

const exponentialDistribution = new ExponentialDistribution();

const generatedData = exponentialDistribution.generateData(lambda=3, size=100);
const convertedData = exponentialDistribution.convertToExponentialDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = ExponentialDistribution;