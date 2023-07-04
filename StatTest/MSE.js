const Math = require("mathjs");
const Filter = require('../Filter.js');

class MSE {
    
    constructor() {
        this.filter = new Filter();
    }

    calculateMse = (data, expected) => {

        var MSE = 0
        
        for (let i = 0; i < data.length; i++) {
            MSE += Math.pow(data[i] - expected[i], 2);
        }

        MSE = MSE / data.length;

        return MSE;
    }

    addRanksAndPercantage = (MSEResults) => {

        const lowestScore = Math.min(...MSEResults.map((entry) => entry[1]));

        const scores = MSEResults.map((entry) => {

            const score = (lowestScore / entry[1] * 100);

            return [entry[0], score]; 
        });
      
        return scores;
    }

    calculateBestFitScore = (data, testDatas) => {

        const MSEResults = {};

        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const score = this.calculateMse(data, scaledData);
            MSEResults[testDataName] = score;
        }

        const sortedMSE = Object.entries(MSEResults);
        sortedMSE.sort((a, b) => a[1] - b[1]);

        const scores = this.addRanksAndPercantage(sortedMSE);

        return scores
    }
}

module.exports = MSE;