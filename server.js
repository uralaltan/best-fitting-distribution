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
const binomialDistribution = new BinomialDistribution(numTrials=100, successProbability=0.5);
const poissonDistribution = new PoissonDistribution();
const exponentialDistribution = new ExponentialDistribution();
const gammaDistribution = new GammaDistribution();
const logDistribution = new LogDistribution();
const logNormalDistribution = new LogNormalDistribution();
const betaDistribution = new BetaDistribution();
const negativeBinomialDistribution = new NegativeBinomialDistribution(successesRequired=5, probabilityOfSuccess=0.5);
// const dirichletDistribution = new DirichletDistribution();

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* The user have to go to this endpoint and request a json in this format -> { "data": [1,2,3,4,5] } 
then our api returns the distributions and their scores in json format */
// You can test the api via shell with "npm run start"

app.post('/evaluate', (req, res) => {
  const userData = req.body;

  if (!userData || !userData.data || !Array.isArray(userData.data)) {
    res.status(400).json({ error: 'Invalid request format' });
    return;
  }

  const testData = userData.data; 

  const result = new ChiSquare(testData, {
    "Normal Distribution": normalDistribution.convertToNormalDistribution(testData),
    "Binomial Distribution": binomialDistribution.convertToBinomialDistribution(testData),
    "Poisson Distribution": poissonDistribution.convertToPoissonDistribution(testData),
    "Exponential Distribution": exponentialDistribution.convertToExponentialDistribution(testData),
    "Gamma Distribution": gammaDistribution.convertToGammaDistribution(testData),
    "Log Distribution": logDistribution.convertToLogDistribution(testData),
    "Log Normal Distribution": logNormalDistribution.convertToLogNormalDistribution(testData),
    "Beta Distribution": betaDistribution.convertToBetaDistribution(testData),
    "Negative Binomial Distribution": negativeBinomialDistribution.convertToNegativeBinomialDistribution(testData)
  }).calculate();

  res.json({ result: result });

});