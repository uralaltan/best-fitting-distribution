const { jStat } = require("jstat");
const Distribution = require('../Distribution.js');

class LogNormalDistribution extends Distribution {

    generateData = (size, mu, sigma) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.lognormal.sample(mu, sigma);
            data.push(sampleData);
        }
        
        return data;
    }
}

module.exports = LogNormalDistribution;