const LogNormalDistribution = require("../../distributions/LogNormalDistribution");

const testSize = Math.floor(Math.random() * 100) + 1;
const randomMu = Math.random() * 10 + 1;
const randomSigma = Math.random() * 10 + 1;


const LND = new LogNormalDistribution();

const generatedData = LND.generateData(testSize, randomMu, randomSigma);

test('Log-Normal Distribution Generate Data Test', () => {
  expect(generatedData.length).toBe(testSize);
});
