const { jStat } = require("jstat");
const Math = require("mathjs");
const Distribution = require('../Distribution.js');

class NormalDistribution extends Distribution {
    
    generateData = (size, mean, variance) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.normal.sample(mean, Math.sqrt(variance));
            data.push(sampleData);
        }

        return data;
    }
}

module.exports = NormalDistribution;
