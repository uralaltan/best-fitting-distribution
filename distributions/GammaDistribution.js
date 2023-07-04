const { jStat } = require("jstat");
const Distribution = require('../Distribution.js');

class GammaDistribution extends Distribution {

    generateData = (size, shape, scale) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.gamma.sample(shape, scale);
            data.push(sampleData);
        }

        return data;
    }
}

module.exports = GammaDistribution;