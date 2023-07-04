const Math = require("mathjs");
const Filter = require('../Filter.js');

class ChiSquare {  

    constructor() {
        this.filter = new Filter();
    }

    calculateChiSquare = (data, expected) => {
        
        var chiSquare = 0
        
        for (let i = 0; i < data.length; i++) {
            chiSquare += Math.pow(data[i] - expected[i], 2) / expected[i];
        }

        if (chiSquare <= 0) {
            return 1
        }

        return chiSquare;
    }

    addRanksAndPercantage = (chiSquareResults) => {

        const lowestScore = Math.min(...chiSquareResults.map((entry) => entry[1]));

        const scores = chiSquareResults.map((entry) => {

            const score = (lowestScore / entry[1] * 100);

            return [entry[0], score]; 
        });
      
        return scores;
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

        const scores = this.addRanksAndPercantage(sortedChiSquare);

        return scores
    }
}

module.exports = ChiSquare;