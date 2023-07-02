const ChiSquare = require('../StatTest/ChiSquare.js');
const MAE = require('../StatTest/MAE.js');
const MSE = require('../StatTest/MAE.js');
const RMSE = require('../StatTest/RMSE.js');

const chiSquare = new ChiSquare();
const Mae = new MAE();
const Mse = new MSE();
const Rmse = new RMSE();

const logTestData = [3, 1, 1, 2, 1, 4, 1, 1, 1, 1, 1, 2, 1, 3, 3, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 1, 1, 2, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 2, 1, 3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 5, 1, 1, 1, 1, 1, 3, 3, 1, 1, 2, 1, 1];

test('Log Distribution Chi Square Test', () => {
    expect(chiSquare.calculateBestFitScore(logTestData)[0][0]).toBe('Log Distribution');
});

test('Log Distribution MAE Test', () => {
    expect(Mae.calculateBestFitScore(logTestData)[0][0]).toBe('Log Distribution');
});

test('Log Distribution MSE Test', () => {
    expect(Mse.calculateBestFitScore(logTestData)[0][0]).toBe('Log Distribution');
});

test('Log Distribution RMSE Test', () => {
    expect(Rmse.calculateBestFitScore(logTestData)[0][0]).toBe('Log Distribution');
});