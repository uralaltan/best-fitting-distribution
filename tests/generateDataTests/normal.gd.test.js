const NormalDistribution = require("../../distributions/NormalDistribution");

const testSize = Math.floor(Math.random() * 100) + 1;
const randomMean = Math.random() * 10 + 1;
const randomVariance = Math.random() * 10 + 1;


const ND = new NormalDistribution();

const generatedData = ND.generateData(testSize, randomMean, randomVariance);

test('Normal Distribution Generate Data Test', () => {
  expect(generatedData.length).toBe(testSize);
});
