const NormalDistribution = require("./distributions/NormalDistribution");
const ExponentialDistribution = require("./distributions/ExponentialDistribution");
const GammaDistribution = require("./distributions/GammaDistribution");
const LogNormalDistribution = require("./distributions/LogNormalDistribution");
const BetaDistribution = require("./distributions/BetaDistribution");

const ChiSquare = require('./StatTest/ChiSquare');
const MAE = require('./StatTest/MAE');
const KS = require('./StatTest/KSTest');

const ParameterEstimator = require('./ParameterEstimator');

class Scorer {

    constructor() {

        this.normal = new NormalDistribution();
        this.exponential = new ExponentialDistribution();
        this.gamma = new GammaDistribution();
        this.logNormal = new LogNormalDistribution();
        this.beta = new BetaDistribution();

        this.chiSquare = new ChiSquare();
        this.mae = new MAE();
        this.ks = new KS();

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
            
        const chiSquareResults = this.chiSquare.calculateBestFitScore(data, testDatas);
        const maeResults = this.mae.calculateBestFitScore(data, testDatas);
        const ksResults = this.ks.calculateBestFitScore(data, testDatas);

        const scores = {
          "Chi Square Results": chiSquareResults,
          "MAE Results": maeResults,
          "KSTest Results": ksResults,
        };
      
        return scores;
      }                
}

module.exports = Scorer;
