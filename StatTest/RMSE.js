const Math = require("mathjs");
const Filter = require('../Filter.js');

class RMSE {
    
    constructor() {
        this.filter = new Filter();
    }
    
    calculateRmse = (data, expected) => {

        var RMSE = 0
        
        for (let i = 0; i < data.length; i++) {
            RMSE += Math.pow(data[i] - expected[i], 2);
        }

        RMSE = RMSE / data.length;

        RMSE = Math.sqrt(RMSE);

        return RMSE;
    }

    addRanksAndPercantage = (RMSEResults) => {

        const lowestScore = Math.min(...RMSEResults.map((entry) => entry[1]));

        const scores = RMSEResults.map((entry) => {

            const score = (lowestScore / entry[1] * 100);

            return [entry[0], score]; 
        });
      
        return scores;
    }

    calculateBestFitScore = (data, testDatas) => {

        const RMSEResults = {};

        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const score = this.calculateRmse(data, scaledData);
            RMSEResults[testDataName] = score;
        }

        const sortedRMSE = Object.entries(RMSEResults);
        sortedRMSE.sort((a, b) => a[1] - b[1]);

        const scores = this.addRanksAndPercantage(sortedRMSE);

        return scores
    }
}

const rmse = new RMSE();

const score = rmse.calculateBestFitScore([1,2,3], {"data": [2,3,4], "sss": [4,5,6]});

console.log(score);

module.exports = RMSE;