const Math = require("mathjs");
const Distribution = require("../distribution");

class BetaDistribution extends Distribution {
    // TODO
    convert(data) {
        return data;
    }

    generateData(alpha, beta, size) {
        const data = [];
      
        for (let i = 0; i < size; i++) {
            const u = Math.random();
            const v = Math.random();
            const sample = Math.pow(u, alpha - 1) * Math.pow(v, beta - 1) / Math.pow(u + v, alpha + beta - 2);
            data.push(sample);
        }
        return data;
    }
}

module.exports = BetaDistribution;