const Math = require("mathjs");
const Distribution = require('../distribution.js');

class BetaDistribution extends Distribution {
    convertToBetaDistribution(data) {
        const alphas = [1, 2, 3, 4, 5];
        const betas = [0.5, 1, 1.5, 2, 2.5];
        let bestAlpha = null;
        let bestBeta = null;
        let lowestChiSquare = Infinity;
        let bestExpected = null;
    
        for (let alpha of alphas) {
            for (let beta of betas) {
                const expected = data.map((x) => {
                    return (
                        (Math.exp(
                            Math.log(this.gammaFunction(alpha)) +
                            Math.log(this.gammaFunction(beta)) -
                            Math.log(this.gammaFunction(alpha + beta))
                        )) /
                        (this.gammaFunction(alpha) * this.gammaFunction(beta))) *
                            Math.pow(x, alpha - 1) *
                            Math.pow(1 - x, beta - 1);
                });
    
                const chiSquare = this.calculateChiSquare(data, expected);
    
                if (chiSquare < lowestChiSquare) {
                    lowestChiSquare = chiSquare;
                    bestAlpha = alpha;
                    bestBeta = beta;
                    bestExpected = expected;
                }
            }
        }
    
        console.log("Beta Distribution Best Alpha: ", bestAlpha);
        console.log("Beta Distribution Best Beta: ", bestBeta);
        return bestExpected;
    }
  
    gammaFunction(n) {
        if (n === 1) {
            return 1;
        } else if (n === 0.5) {
            return Math.sqrt(Math.pi);
        } else {
            return (n - 1) * this.gammaFunction(n - 1);
        }
    }
  
    calculateChiSquare(observed, expected) {
        let chiSquare = 0;
        for (let i = 0; i < observed.length; i++) {
            chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
        }
        return chiSquare;
    }

    generateData(alpha, beta, size) {
        const data = [];
      
        for (let i = 0; i < size; i++) {
            const u = Math.random();
            const v = Math.random();
            const sample = Math.pow(u, alpha - 1) * Math.pow(v, beta - 1) / Math.pow(u + v, alpha + beta - 2);
            data.push(sample);
        }
        return data;
    }
}

/*

const betaDistribution = new BetaDistribution();

const generatedData = betaDistribution.generateData(alpha=3, beta=0.2, size=100);
const convertedData = betaDistribution.convertToBetaDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = BetaDistribution;