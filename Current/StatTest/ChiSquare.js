const Math = require("mathjs");

class ChiSquare {  

    calculateChiSquare(data, expected) {
        
        var chiSquare = 0
        
        for (let i = 0; i < data.length; i++) {
            chiSquare += Math.pow(data[i] - expected[i], 2) / expected[i];
        }

        if (chiSquare <= 0) {
            return 1
        }

        return chiSquare;
    }


    calculateBestFitScore(data) {
        
        const len = data.length;

        const chiSquareResults = {};

        for (const testDataName in this.testDatas) {
            const scaledData = this.filter.scaleArray(this.testDatas[testDataName]);
            const binData = this.filter.convertToBins(scaledData, k=5);
            // const score = this.calculateChiSquare(data, binData);
            const score = this.calculateMSEScore(data, binData);
            chiSquareResults[testDataName] = score;
        }

        const sortedChiSquare = Object.entries(chiSquareResults);
        sortedChiSquare.sort((a, b) => a[1] - b[1]);

        return sortedChiSquare
    }

    addRanksAndPercantage(chiSquareResults) {

        const lowestScore = Math.min(...chiSquareResults.map((entry) => entry[1]));

        const scores = chiSquareResults.map((entry) => {

            const score = (lowestScore / entry[1] * 100);

            return [entry[0], score]; 
        });
      
        return scores;
    }
}

module.exports = ChiSquare;