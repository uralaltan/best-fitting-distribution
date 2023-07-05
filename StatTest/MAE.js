const Math = require("mathjs");
const Filter = require('../Filter.js');

class MAE {
    
    constructor() {
        this.filter = new Filter();
    }

    calculateMae = (data, expected) => {

        var MAE = 0
        
        for (let i = 0; i < data.length; i++) {
            MAE += Math.abs(data[i] - expected[i]);
        }

        MAE = MAE / data.length;

        return MAE;
    }

    // addRanksAndPercantage = (MAEResults) => {

    //     const lowestScore = Math.min(...MAEResults.map((entry) => entry[1]));

    //     const scores = MAEResults.map((entry) => {

    //         const score = (lowestScore / entry[1] * 100);

    //         return [entry[0], score]; 
    //     });
      
    //     return scores;
    // }

    calculateBestFitScore = (data, testDatas) => {

        const MAEResults = {};

        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const score = this.calculateMae(data, scaledData);
            MAEResults[testDataName] = score;
        }

        const sortedMAE = Object.entries(MAEResults);
        sortedMAE.sort((a, b) => a[1] - b[1]);

        // const scores = this.addRanksAndPercantage(sortedMAE);

        return sortedMAE
    }
}

module.exports = MAE;