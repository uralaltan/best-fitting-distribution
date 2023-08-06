const NormalDistribution = require("./distributions/NormalDistribution");
const ExponentialDistribution = require("./distributions/ExponentialDistribution");
const GammaDistribution = require("./distributions/GammaDistribution");
const LogNormalDistribution = require("./distributions/LogNormalDistribution");
const BetaDistribution = require("./distributions/BetaDistribution");

const ChiSquare = require('./StatTest/ChiSquare');
const MAE = require('./StatTest/MAE');
const MSE = require('./StatTest/MSE');
const RMSE = require('./StatTest/RMSE');
const KS = require('./StatTest/KSTest');

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
        this.ks = new KS();

        this.filter = new Filter();
        this.estimator = new ParameterEstimator();
    }

    calculateScore = (data) => {
        
        const parameters = this.estimator.estimateParameters(data);

        const testDatas = {
          "Normal Distribution": this.normal.generateData(
            parameters.length,
            parameters.mean,
            parameters.variance
          ),
          "Exponential Distribution": this.exponential.generateData(
            parameters.length,
            parameters.lambda
          ),
          "Gamma Distribution": this.gamma.generateData(
            parameters.length,
            parameters.shape,
            parameters.scale
          ),
          "Log Normal Distribution": this.logNormal.generateData(
            parameters.length,
            parameters.mu,
            parameters.sigma
          ),
          "Beta Distribution": this.beta.generateData(
            parameters.length,
            parameters.alpha,
            parameters.beta
          ),
        };
      
        const scaledData = this.filter.scaleArray(data);
      
        const chiSquareResults = this.chiSquare.calculateBestFitScore(scaledData, testDatas);
        const maeResults = this.mae.calculateBestFitScore(scaledData, testDatas);
        const mseResults = this.mse.calculateBestFitScore(scaledData, testDatas);
        const rmseResults = this.rmse.calculateBestFitScore(scaledData, testDatas);
        const ksResults = this.ks.calculateBestFitScore(scaledData, testDatas);

        const scores = {
          "Chi Square Results": chiSquareResults,
          "MAE Results": maeResults,
          "MSE Results": mseResults,
          "RMSE Results": rmseResults,
          "KSTest Results": ksResults,
        };
      
        return scores;
      }                
}

module.exports = Scorer;
