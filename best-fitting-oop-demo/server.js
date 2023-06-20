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

  const chiSquare = new ChiSquare();


  if (!userData || !userData.data || !Array.isArray(userData.data)) {
    res.status(400).json({ error: 'Invalid request format' });
    return;
  }

  const observed = userData.data;

  const chiSquareRankings = {
    "Normal Distribution": chiSquare.calculateChiSquare(normalDistribution, observed),
    // "Binomial Distribution": chiSquare.calculateChiSquare(binomialDistribution, observed),
    "Poisson Distribution": chiSquare.calculateChiSquare(poissonDistribution, observed),
    "Exponential Distribution": chiSquare.calculateChiSquare(exponentialDistribution, observed),
    // "Gamma Distribution": chiSquare.calculateChiSquare(gammaDistribution, observed),
    // "Log Distribution": chiSquare.calculateChiSquare(logDistribution, observed),
    "Log Normal Distribution": chiSquare.calculateChiSquare(logNormalDistribution, observed),
    // "Beta Distribution": chiSquare.calculateChiSquare(betaDistribution, observed),
    // "Negative Binomial Distribution": chiSquare.calculateChiSquare(negativeBinomialDistribution, observed),
  };

  res.json({ result: chiSquareRankings });

});