// Chi Square Test
const ChiSquare = require('./ChiSquare.js');

// Distributions
const NormalDistribution = require('./distributions/normalDistribution.js');
const BinomialDistribution = require('./distributions/binomialDistribution.js');
const PoissonDistribution = require('./distributions/poissonDistribution.js');
const ExponentialDistribution = require('./distributions/exponentialDistribution.js');
const GammaDistribution = require('./distributions/gammaDistribution.js');
const LogDistribution = require('./distributions/logDistribution.js');
const LogNormalDistribution = require('./distributions/logNormalDistribution.js');
const BetaDistribution = require('./distributions/betaDistribution.js');
const NegativeBinomialDistribution = require('./distributions/negativeBinomialDistribution.js');
// const DirichletDistribution = require('./distributions/dirichletDistribution.js');

// Distribution Classes
const normalDistribution = new NormalDistribution();
const binomialDistribution = new BinomialDistribution();
const poissonDistribution = new PoissonDistribution();
const exponentialDistribution = new ExponentialDistribution();
const gammaDistribution = new GammaDistribution();
const logDistribution = new LogDistribution();
const logNormalDistribution = new LogNormalDistribution();
const betaDistribution = new BetaDistribution();
const negativeBinomialDistribution = new NegativeBinomialDistribution();
// const dirichletDistribution = new DirichletDistribution();

// Generate Test Data
const normalTestData = normalDistribution.generateData(size=100);
const binomialTestData = binomialDistribution.generateData(size=100, numTrials=100, successProbability=0.5);
const poissonTestData = poissonDistribution.generateData(lambda=2, size=100);
const exponentialTestData = exponentialDistribution.generateData(lambda=2, size=100);
const gammaTestData = gammaDistribution.generateData(shape=3, scale=0.3, size=100);
const logTestData = logDistribution.generateData(minValue=0.1, maxValue=1, size=100);
const logNormalTestData = logNormalDistribution.generateData(mu=0, sigma=0.25, size=100);
const betaTestData = betaDistribution.generateData(alpha=3, beta=0.2, size=100);
const negativeBinomialData = negativeBinomialDistribution.generateData(size=100, successesRequired=5, probabilityOfSuccess=0.5);

const testData = normalTestData;

console.log(testData);

const chiSquare = new ChiSquare();

const chiSquareRankings = {
            "Normal Distribution": chiSquare.calculateChiSquare(normalDistribution, testData),
            // "Binomial Distribution": chiSquare.calculateChiSquare(binomialDistribution, testData),
            "Poisson Distribution": chiSquare.calculateChiSquare(poissonDistribution, testData),
            "Exponential Distribution": chiSquare.calculateChiSquare(exponentialDistribution, testData),
            // "Gamma Distribution": chiSquare.calculateChiSquare(gammaDistribution, testData),
            // "Log Distribution": chiSquare.calculateChiSquare(logDistribution, testData),
            "Log Normal Distribution": chiSquare.calculateChiSquare(logNormalDistribution, testData),
            // "Beta Distribution": chiSquare.calculateChiSquare(betaDistribution, testData),
            // "Negative Binomial Distribution": chiSquare.calculateChiSquare(negativeBinomialDistribution, testData),
        };

console.log(chiSquareRankings);
