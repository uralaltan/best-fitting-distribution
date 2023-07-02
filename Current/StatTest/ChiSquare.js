const Math = require("mathjs");

const Normal = require('../distributions/normalDistribution');
const Poisson = require('../distributions/poissonDistribution');
const Exponential = require('../distributions/exponentialDistribution');
const Gamma = require('../distributions/gammaDistribution');
const LogNormal = require('../distributions/logNormalDistribution');
const Beta = require('../distributions/betaDistribution');
const Log = require('../distributions/logDistribution');
const Binomial = require('../distributions/binomialDistribution');
const NegativeBinomial = require('../distributions/negativeBinomialDistribution');

class ChiSquare {
    
    constructor() {
        this.normal = new Normal();
        this.poisson = new Poisson();
        this.exponential = new Exponential();
        this.gamma = new Gamma();
        this.logNormal = new LogNormal();
        this.beta = new Beta();
        this.log = new Log();
        this.binomial = new Binomial();
        this.negativeBinomial = new NegativeBinomial();
    }

    calculateChiSquare(data, expected) {
        
        var chiSquare = 0
        
        for (let i = 0; i < data.length; i++) {
            chiSquare += Math.pow(data[i] - expected[i], 2) / expected[i];
        }

        if (chiSquare <= 0) {
            return 1
        }

        return chiSquare;
    }

    addRanksAndPercantage(chiSquareResults) {

        const lowestScore = Math.min(...chiSquareResults.map((entry) => entry[1]));

        const scores = chiSquareResults.map((entry) => {

            const score = (lowestScore / entry[1] * 100);

            return [entry[0], score]; 
        });
      
        return scores;
    }

    calculateBestFitScore(data) {

        const testDatas = {
            "Normal Distribution": this.generateNormalData(data),
            "Poisson Distribution": this.generatePoissonData(data),
            "Exponential Distribution": this.generateExponentialData(data),
            "Gamma Distribution": this.generateGammaData(data),
            "Log Normal Distribution": this.generateLogNormalData(data),
            "Beta Distribution": this.generateBetaData(data),
            "Log Distribution": this.generateLogData(data),
            "Binomial Distribution": this.generateBinomialData(data),
            "Negative Binomial Distribution": this.generateNegativeBinomialData(data)
        }

        const chiSquareResults = {};

        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const binData = this.filter.convertToBins(scaledData, k=5);
            const score = this.calculateChiSquare(data, binData);
            chiSquareResults[testDataName] = score;
        }

        const sortedChiSquare = Object.entries(chiSquareResults);
        sortedChiSquare.sort((a, b) => a[1] - b[1]);

        const scores = addRanksAndPercantage(sortedChiSquare);

        return scores
    }

    

    generateNormalData(data) {
        // Calculate the parameters

        return this.normal.generateData(data, mean, varience);
    }

    generatePoissonData(data) {
        // Calculate the parameters

        return this.poisson.generateData(data, lambda);
    }

    generateExponentialData(data) {
        // Calculate the parameters

        return this.exponential.generateData(data, lambda);
    }

    generateGammaData(data) {
        // Calculate the parameters

        return this.gamma.generateData(data, shape, scale);
    }

    generateLogNormalData(data) {
        // Calculate the parameters

        return this.logNormal.generateData(mu, sigma, data);
    }

    generateBetaData(data) {
        // Calculate the parameters

        return this.beta.generateData(alpha, beta, size);
    }

    generateLogData(data) {
        // Calculate the parameters

        return this.log.generateData(min, max, size);
    }

    generateBinomialData(data) {
        // Calculate the parameters

        return this.binomial.generateData(dataPoints, trials, success);
    }

    generateNegativeBinomialData(data) {
        // Calculate the parameters

        return this.negativeBinomial.generateData(size, required, success);
    }
}

module.exports = ChiSquare;