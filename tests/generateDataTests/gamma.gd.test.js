const GammaDistribution = require("../../distributions/GammaDistribution");

const testSize = Math.floor(Math.random() * 100) + 1;
const randomShape = Math.random() * 10 + 1;
const randomScale = Math.random() * 10 + 1;


const GD = new GammaDistribution();

const generatedData = GD.generateData(testSize, randomShape, randomScale);

test('Gamma Distribution Generate Data Test', () => {
  expect(generatedData.length).toBe(testSize);
});
