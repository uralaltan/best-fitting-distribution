const Math = require("mathjs");

class MAE {
    
    constructor() {}

    calculateMae = (data, expected) => {

        var MAE = 0
        
        for (let i = 0; i < data.length; i++) {
            MAE += Math.abs(data[i] - expected[i]);
        }

        MAE = MAE / data.length;

        return MAE;
    }

    calculateBestFitScore = (data, testDatas) => {

        const MAEResults = {};

        for (const testDataName in testDatas) {
            const score = this.calculateMae(data, testDatas[testDataName]);
            MAEResults[testDataName] = score;
        }

        const sortedMAE = Object.entries(MAEResults);
        sortedMAE.sort((a, b) => a[1] - b[1]);

        return sortedMAE
    }
}

module.exports = MAE;