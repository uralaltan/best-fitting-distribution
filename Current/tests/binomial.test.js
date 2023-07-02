const ChiSquare = require('../StatTest/ChiSquare.js');
const MAE = require('../StatTest/MAE.js');
const MSE = require('../StatTest/MAE.js');
const RMSE = require('../StatTest/RMSE.js');

const chiSquare = new ChiSquare();
const Mae = new MAE();
const Mse = new MSE();
const Rmse = new RMSE();

const binomialTestData = [2, 8, 6, 4, 4, 4, 6, 6, 4, 4, 3, 6, 6, 4, 2, 3, 8, 4, 6, 6, 5, 4, 3, 5, 6, 6, 5, 2, 8, 6, 4, 8, 5, 5, 6, 6, 6, 3, 4, 7, 4, 4, 5, 5, 5, 7, 4, 3, 4, 7, 6, 4, 6, 7, 7, 7, 4, 6, 5, 7, 6, 6, 6, 4, 5, 8, 7, 2, 3, 3, 6, 6, 4, 5, 7, 6, 5, 5, 5, 4, 5, 6, 7, 6, 6, 3, 5, 1, 4, 6, 9, 3, 5, 6, 4, 5, 6, 5, 4, 4];

test('Binomial Distribution Chi Square Test', () => {
    expect(chiSquare.calculateBestFitScore(binomialTestData)[0][0]).toBe('Binomial Distribution');
});

test('Binomial Distribution MAE Test', () => {
    expect(Mae.calculateBestFitScore(binomialTestData)[0][0]).toBe('Binomial Distribution');
});

test('Binomial Distribution MSE Test', () => {
    expect(Mse.calculateBestFitScore(binomialTestData)[0][0]).toBe('Binomial Distribution');
});

test('Binomial Distribution RMSE Test', () => {
    expect(Rmse.calculateBestFitScore(binomialTestData)[0][0]).toBe('Binomial Distribution');
});