const ChiSquare = require('../StatTest/ChiSquare.js');
const MAE = require('../StatTest/MAE.js');
const MSE = require('../StatTest/MAE.js');
const RMSE = require('../StatTest/RMSE.js');

const chiSquare = new ChiSquare();
const Mae = new MAE();
const Mse = new MSE();
const Rmse = new RMSE();

const negativeBinomialTestData = [11, 8, 13, 17, 6, 22, 14, 8, 13, 4, 8, 10, 7, 7, 5, 17, 11, 9, 9, 11, 11, 12, 12, 11, 4, 19, 25, 9, 9, 17, 8, 6, 9, 11, 17, 10, 7, 3, 8, 12, 13, 11, 15, 14, 4, 7, 1, 14, 7, 9, 4, 5, 6, 13, 6, 2, 15, 13, 3, 5, 14, 4, 4, 13, 16, 10, 4, 4, 17, 16, 14, 17, 21, 12, 10, 20, 7, 12, 12, 6, 5, 12, 10, 19, 15, 11, 4, 3, 13, 9, 11, 7, 9, 10, 13, 5, 10, 8, 4, 9];

test('Negative Binomial Distribution Chi Square Test', () => {
    expect(chiSquare.calculateBestFitScore(negativeBinomialTestData)[0][0]).toBe('Negative Binomial Distribution');
});

test('Negative Binomial Distribution MAE Test', () => {
    expect(Mae.calculateBestFitScore(negativeBinomialTestData)[0][0]).toBe('Negative Binomial Distribution');
});

test('Negative Binomial Distribution MSE Test', () => {
    expect(Mse.calculateBestFitScore(negativeBinomialTestData)[0][0]).toBe('Negative Binomial Distribution');
});

test('Negative Binomial Distribution RMSE Test', () => {
    expect(Rmse.calculateBestFitScore(negativeBinomialTestData)[0][0]).toBe('Negative Binomial Distribution');
});