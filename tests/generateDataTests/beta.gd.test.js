const BetaDistribution = require("../../distributions/BetaDistribution");

const testSize = Math.floor(Math.random() * 100) + 1;
const randomAlpha = Math.random() * 10 + 1;
const randomBeta = Math.random() * 10 + 1;


const BD = new BetaDistribution();

const generatedData = BD.generateData(testSize, randomAlpha, randomBeta);

test('Beta Distribution Generate Data Test', () => {
  expect(generatedData.length).toBe(testSize);
});
