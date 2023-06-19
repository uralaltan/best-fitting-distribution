const Math = require("mathjs");
const Distribution = require('../distribution.js');

class PoissonDistribution extends Distribution {
    convertToPoissonDistribution(data) {
        const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));
    
        const lambdas = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0];
        let bestLambda = null;
        let lowestChiSquare = Infinity;
        let bestExpected = null;
    
        try {
            for (let lambda of lambdas) {
                const expected = data.map((number) => {
                    return Math.pow(lambda, number) * Math.exp(-lambda) / factorial(number);
                });
        
                const chiSquare = this.calculateChiSquare(data, expected);
        
                if (chiSquare < lowestChiSquare) {
                    lowestChiSquare = chiSquare;
                    bestLambda = lambda;
                    bestExpected = expected;
                }
            }
        }
        catch (error) {
            console.warn("Maximum call stack exceeded in poisson distribution.");
        }
    
        console.log("Poisson Distribution Best Lambda: ", bestLambda);
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
            let L = Math.exp(-lambda);
            let k = 0;
            let p = 1;
        
            do {
                k++;
                let rand = Math.random();
                p *= rand;
            } while (p > L);
        
            data.push(k - 1);
        }
        return data;
    }
}

/*

const poissonDistribution = new PoissonDistribution();

const generatedData = poissonDistribution.generateData(lambda=3, size=100);
const convertedData = poissonDistribution.convertToPoissonDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = PoissonDistribution;