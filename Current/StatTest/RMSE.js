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

class RMSE {

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

    calculateRmse = (data, expected) => {

        var RMSE = 0
        
        for (let i = 0; i < data.length; i++) {
            RMSE += Math.pow(data[i] - expected[i], 2);
        }

        RMSE = RMSE / data.length;

        RMSE = Math.sqrt(RMSE);

        return RMSE;
    }

    addRanksAndPercantage(RMSEResults) {

        const lowestScore = Math.min(...RMSEResults.map((entry) => entry[1]));

        const scores = RMSEResults.map((entry) => {

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

        const RMSEResults = {};

        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const binData = this.filter.convertToBins(scaledData, k=5);
            const score = this.calculateRmse(data, binData);
            RMSEResults[testDataName] = score;
        }

        const sortedRMSE = Object.entries(RMSEResults);
        sortedRMSE.sort((a, b) => a[1] - b[1]);

        const scores = addRanksAndPercantage(sortedRMSE);

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

module.exports = RMSE;