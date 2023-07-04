const { jStat } = require("jstat");
const Distribution = require('../Distribution.js');

class ExponentialDistribution extends Distribution {

    generateData = (size, lambda) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.exponential.sample(lambda);
            data.push(sampleData);
        }

        return data;
    }
}

module.exports = ExponentialDistribution;