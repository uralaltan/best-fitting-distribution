const Filter = require("./Filter.js");
const NormalDistribution = require("./distributions/normalDistribution.js");
const ChiSquare = require("./ChiSquare.js");

const data = [-10000,1,2,3,4,5,10000];

const filter = new Filter();

const newData = filter.removeOutliers(data);

console.log(newData);

normalDistribution = new NormalDistribution();

const normalTestData = normalDistribution.generateData(size=100);

const testData = normalTestData;

var mean = testData.reduce((a, b) => a + b, 0) / testData.length;

if(mean < 0){
    mean = -mean;
}

const shiftRight = filter.shiftDistribution(testData, mean);
const shiftLeft = filter.shiftDistribution(testData, -mean);
const scaleUp = filter.scaleDistribution(testData, 2);
const scaleDown = filter.scaleDistribution(testData, 1/2);
const standard = filter.standardizeDistribution(testData);

const chiSquare = new ChiSquare();

const chiSquareRankings = {
            "Normal Distribution normal": chiSquare.calculateChiSquare(normalDistribution, testData),
            "Normal Distribution shifted right by mean": chiSquare.calculateChiSquare(normalDistribution, shiftRight),
            "Normal Distribution shifted left by mean": chiSquare.calculateChiSquare(normalDistribution, shiftLeft),
            "Normal Distribution scaled up by 2": chiSquare.calculateChiSquare(normalDistribution, scaleUp),
            "Normal Distribution scaled down by 1/2": chiSquare.calculateChiSquare(normalDistribution, scaleDown),
            "Normal Distribution standardized(sub mean, divide by stdDev)": chiSquare.calculateChiSquare(normalDistribution, standard),

            // "Binomial Distribution": chiSquare.calculateChiSquare(binomialDistribution, testData),
            ////"Poisson Distribution": chiSquare.calculateChiSquare(poissonDistribution, testData),
            ////"Exponential Distribution": chiSquare.calculateChiSquare(exponentialDistribution, testData),
            ////"Gamma Distribution": chiSquare.calculateChiSquare(gammaDistribution, testData),
            // "Log Distribution": chiSquare.calculateChiSquare(logDistribution, testData),
            ////"Log Normal Distribution": chiSquare.calculateChiSquare(logNormalDistribution, testData),
            // "Beta Distribution": chiSquare.calculateChiSquare(betaDistribution, testData),
            // "Negative Binomial Distribution": chiSquare.calculateChiSquare(negativeBinomialDistribution, testData),
        };

console.log(chiSquareRankings);
