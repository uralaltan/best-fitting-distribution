const { jStat } = require("jstat");
const Distribution = require("../Distribution.js");

class BetaDistribution extends Distribution {
    
    generateData = (size, alpha, beta) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.beta.sample(alpha, beta);
            data.push(sampleData);
        }

        return data;
    }
}

module.exports = BetaDistribution;