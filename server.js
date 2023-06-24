// KS Test
const KS = require('./KSTest.js');
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

  const ks = new KS();


  if (!userData || !userData.data || !Array.isArray(userData.data)) {
    res.status(400).json({ error: 'Invalid request format' });
    return;
  }

  const observed = userData.data;

  const KSTestScores = {
    "Normal Distribution": ks.normal(observed),
    "Poisson Distribution": ks.poisson(observed),
    "Exponential Distribution": ks.exponential(observed),
    "Gamma Distribution": ks.gamma(observed),
    "Log Normal Distribution": ks.lognormal(observed),
    "Beta Distribution": ks.beta(observed),
  };
  
  const scaledTestScores = {};

  const maxOriginalValue = Math.max(...Object.values(KSTestScores));
  const minOriginalValue = Math.min(...Object.values(KSTestScores));
  const range = maxOriginalValue - minOriginalValue;

  for (const [key, value] of Object.entries(KSTestScores)) {
  const scaledValue = 100 - ((value - minOriginalValue) / range) * 100;
  scaledTestScores[key] = scaledValue;
  }

  res.json({ result: scaledTestScores });

});