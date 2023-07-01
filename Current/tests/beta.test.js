const Beta = require('./distributions/betaDistribution.js');

const beta = new Beta();

const testData = [1,2,3,4,5];

const generatedBetaData = beta.generateData(testData);

// halledilmesi lazım
test()
