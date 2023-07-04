const NormalDistribution = require("./distributions/NormalDistribution");
const ExponentialDistribution = require("./distributions/BetaDistribution");
const GammaDistribution = require("./distributions/BetaDistribution");
const LogNormalDistribution = require("./distributions/BetaDistribution");
const BetaDistribution = require("./distributions/BetaDistribution");

const ChiSquare = require('./StatTest/ChiSquare');
const MAE = require('./StatTest/MAE');
const MSE = require('./StatTest/MSE');
const RMSE = require('./StatTest/RMSE');

const ParameterEstimator = require('./ParameterEstimator');
const Filter = require('./Filter');

class Scorer {

    constructor() {

        this.normal = new NormalDistribution();
        this.exponential = new ExponentialDistribution();
        this.gamma = new GammaDistribution();
        this.logNormal = new LogNormalDistribution();
        this.beta = new BetaDistribution();

        this.chiSquare = new ChiSquare();
        this.mae = new MAE();
        this.mse = new MSE();
        this.rmse = new RMSE();

        this.filter = new Filter();
        this.estimator = new ParameterEstimator();
    }

    calculateScore = (data) => {

        const parameters = this.estimator.estimateParameters(data);

        const length = parameters['length'];
        const mean = parameters['mean'];
        const variance = parameters['variance'];
        const alpha = parameters['alpha'];
        const beta = parameters['beta'];
        const lambda = parameters['lambda'];
        const shape = parameters['shape'];
        const scale = parameters['scale'];
        const mu = parameters['mu'];
        const sigma = parameters['sigma'];

        const testDatas = {
            "Normal Distribution": this.normal.generateData(length, mean, variance),
            "Exponential Distribution": this.exponential.generateData(length, lambda),
            "Gamma Distribution": this.gamma.generateData(length, shape, scale),
            "Log Normal Distribution": this.logNormal.generateData(length, mu, sigma),
            "Beta Distribution": this.beta.generateData(length, alpha, beta),
        }
        
        const scaledData = this.filter.scaleArray(data);

        const chiSquareResults = this.chiSquare.calculateBestFitScore(scaledData, testDatas);
        const maeResults = this.mae.calculateBestFitScore(scaledData, testDatas);
        const mseResults = this.mse.calculateBestFitScore(scaledData, testDatas);
        const rmseResults = this.rmse.calculateBestFitScore(scaledData, testDatas);
    
        const scores = {
            "Chi Square Results": chiSquareResults,
            "MAE Results": maeResults,
            "MSE Results": mseResults,
            "RMSE Results": rmseResults,
        }

        return scores;
    }
}

module.exports = Scorer;