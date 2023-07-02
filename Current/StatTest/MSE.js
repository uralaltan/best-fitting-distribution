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

class MSE {

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

    calculateMse = (data, expected) => {

        var MSE = 0
        
        for (let i = 0; i < data.length; i++) {
            MSE += Math.pow(data[i] - expected[i], 2);
        }

        MSE = MSE / data.length;

        return MSE;
    }

    addRanksAndPercantage(MSEResults) {

        const lowestScore = Math.min(...MSEResults.map((entry) => entry[1]));

        const scores = MSEResults.map((entry) => {

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

        const MSEResults = {};

        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const binData = this.filter.convertToBins(scaledData, k=5);
            const score = this.calculateMse(data, binData);
            MSEResults[testDataName] = score;
        }

        const sortedMSE = Object.entries(MSEResults);
        sortedMSE.sort((a, b) => a[1] - b[1]);

        const scores = addRanksAndPercantage(sortedMSE);

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

module.exports = MSE;