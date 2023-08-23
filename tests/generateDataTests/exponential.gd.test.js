const ExponentialDistribution = require("../../distributions/ExponentialDistribution");

const testSize = Math.floor(Math.random() * 100) + 1;
const randomLambda = Math.random() * 10 + 1;


const ED = new ExponentialDistribution();

const generatedData = ED.generateData(testSize, randomLambda);

test('Exponential Distribution Generate Data Test', () => {
  expect(generatedData.length).toBe(testSize);
});
