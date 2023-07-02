const ChiSquare = require('../StatTest/ChiSquare.js');
const MAE = require('../StatTest/MAE.js');
const MSE = require('../StatTest/MAE.js');
const RMSE = require('../StatTest/RMSE.js');

const chiSquare = new ChiSquare();
const Mae = new MAE();
const Mse = new MSE();
const Rmse = new RMSE();

const poissonTestData = [3, 8, 2, 3, 5, 8, 3, 2, 5, 3, 8, 10, 3, 2, 5, 7, 6, 6, 2, 4, 9, 7, 11, 8, 3, 2, 3, 4, 5, 5, 4, 3, 8, 2, 1, 4, 5, 4, 3, 4, 8, 2, 2, 2, 7, 6, 7, 6, 7, 6, 4, 2, 3, 4, 7, 4, 3, 2, 6, 3, 5, 9, 6, 6, 9, 4, 9, 2, 10, 6, 9, 4, 1, 6, 8, 6, 2, 3, 5, 3, 3, 5, 6, 5, 3, 5, 3, 3, 6, 5, 6, 2, 4, 7, 6, 5, 4, 3, 3, 7];

test('Poisson Distribution Chi Square Test', () => {
    expect(chiSquare.calculateBestFitScore(poissonTestData)[0][0]).toBe('Poisson Distribution');
});

test('Poisson Distribution MAE Test', () => {
    expect(Mae.calculateBestFitScore(poissonTestData)[0][0]).toBe('Poisson Distribution');
});

test('Poisson Distribution MSE Test', () => {
    expect(Mse.calculateBestFitScore(poissonTestData)[0][0]).toBe('Poisson Distribution');
});

test('Poisson Distribution RMSE Test', () => {
    expect(Rmse.calculateBestFitScore(poissonTestData)[0][0]).toBe('Poisson Distribution');
});