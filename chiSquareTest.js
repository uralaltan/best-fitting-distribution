const Math = require("mathjs");

class ChiSquare {
    constructor(observed, expected) {
        this.observed = observed;
        this.expected = expected;
        this.numCategories = observed.length;
        this.distributionNames = Object.keys(expected);
        this.numDistributions = this.distributionNames.length;
        this.totalObserved = this.observed.reduce((sum, value) => sum + value, 0);
        this.df = this.numCategories - 1;
    }
  
    calculateChiSquare() {
        let chiSquare = 0;
        for (let i = 0; i < this.numCategories; i++) {
            chiSquare += Math.pow(this.observed[i] - this.expected[i], 2) / this.expected[i];
        }
        return chiSquare;
    }
  
    calculateScoresAndRanks() {
        const scores = this.distributionNames.map((distributionName) => {
            const distributionData = this.expected[distributionName];
            // If distribution returns null value
            if (distributionData === null) {
                return { distributionName, score: NaN };
            }

            const expectedFreq = distributionData.map((prob) => prob * this.totalObserved);
    
            const score = this.observed.reduce((sum, value, categoryIndex) => {
                const expected = expectedFreq[categoryIndex];
                const difference = value - expected;
                return sum + (difference * difference) / expected;
            }, 0);
    
            return { distributionName, score };
        });
    
        // To sort datas that has the value infinity or NaN
        scores.sort((a, b) => {
            if (a.score === Infinity && b.score === Infinity) {
                return 0;
            } else if (a.score === Infinity) {
                return 1;
            } else if (b.score === Infinity) {
                return -1;
            } else if (isNaN(a.score) && isNaN(b.score)) {
                return 0;
            } else if (isNaN(a.score)) {
                return 1;
            } else if (isNaN(b.score)) {
                return -1;
            } else {
                return a.score - b.score;
            }
        });
    
        const ranks = scores.map((score, index) => {
            const rank = index + 1;
            return { ...score, rank };
        });
    
        return ranks;
    }
  
    calculate() {
        const ranks = this.calculateScoresAndRanks();
    
        const result = {};
        ranks.forEach((rank) => {
            const { distributionName, score, rank: distributionRank } = rank;
            result[distributionName] = { score, rank: distributionRank };
        });
    
        return { ranks: result };
    }
}

/*

const observed = [10, 15, 20];
const expected = {
    "Distribution 1": [0.3, 0.4, 0.3],
    "Distribution 2": [0.25, 0.45, 0.3],
    "Distribution 3": [0.35, 0.3, 0.35]
};

const chiSquare = new ChiSquare(observed, expected);
const ranks = chiSquare.calculate();

console.log(ranks);

*/

module.exports = ChiSquare;