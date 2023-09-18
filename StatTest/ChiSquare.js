const Math = require("mathjs");
const Filter = require('../Filter.js');

class ChiSquare {  

    constructor() {
        this.filter = new Filter();
    }

    calculateChiSquare = (data, expected, eps=1e-6) => {
        
        var chiSquare = 0
        
        for (let i = 0; i < data.length; i++) {
            chiSquare += Math.pow(data[i] - expected[i], 2) / (expected[i] + eps);
        }

        if (chiSquare <= 0) {
            return 1
        }

        return chiSquare;
    }

    calculateBestFitScore = (data, testDatas) => {

        const chiSquareResults = {};

        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const score = this.calculateChiSquare(data, scaledData);
            chiSquareResults[testDataName] = score;
        }

        const sortedChiSquare = Object.entries(chiSquareResults);
        sortedChiSquare.sort((a, b) => a[1] - b[1]);

        return sortedChiSquare
    }
}

module.exports = ChiSquare;