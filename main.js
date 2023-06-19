// Chi Square Test
const ChiSquare = require('./chiSquareTest.js');

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
const normalTestData = normalDistribution.generateData(size=1000);
const binomialTestData = binomialDistribution.generateData(size=1000, numTrials=100, successProbability=0.5);
const poissonTestData = poissonDistribution.generateData(lambda=2, size=1000);
const exponentialTestData = exponentialDistribution.generateData(lambda=2, size=1000);
const gammaTestData = gammaDistribution.generateData(shape=3, scale=0.3, size=1000);
const logTestData = logDistribution.generateData(minValue=0.1, maxValue=1, size=1000);
const logNormalTestData = logNormalDistribution.generateData(mu=0, sigma=0.25, size=1000);
const betaTestData = betaDistribution.generateData(alpha=3, beta=0.2, size=1000);
const negativeBinomialData = negativeBinomialDistribution.generateData(size=1000, successesRequired=5, probabilityOfSuccess=0.5);

const testData = gammaTestData;

const chiSquare = new ChiSquare(testData, {
            "Normal Distribution": normalDistribution.convertToNormalDistribution(testData),
            "Binomial Distribution": binomialDistribution.convertToBinomialDistribution(testData),
            "Poisson Distribution": poissonDistribution.convertToPoissonDistribution(testData),
            "Exponential Distribution": exponentialDistribution.convertToExponentialDistribution(testData),
            "Gamma Distribution": gammaDistribution.convertToGammaDistribution(testData),
            "Log Distribution": logDistribution.convertToLogDistribution(testData),
            "Log Normal Distribution": logNormalDistribution.convertToLogNormalDistribution(testData),
            "Beta Distribution": betaDistribution.convertToBetaDistribution(testData),
            "Negative Binomial Distribution": negativeBinomialDistribution.convertToNegativeBinomialDistribution(testData, 5, 0.5)
        });

const chiSquareRanks = chiSquare.calculate();

console.log(chiSquareRanks);
