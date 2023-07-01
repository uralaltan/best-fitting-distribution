const Math = require("mathjs");
const Distribution = require('../distribution.js');

class NegativeBinomialDistribution extends Distribution {
    // TODO
    convert(data) {
        return data;
    }

    generateData(size, successesRequired, probabilityOfSuccess) {
        let data = [];
        for (let i = 0; i < size; i++) {
            let count = 0;
            let trials = 0;

            while (count < successesRequired) {
                let random = Math.random();
                if (random < probabilityOfSuccess) {
                    count++;
                }
                trials++;
            }
            data.push(trials - successesRequired);
        }
        return data;
    }
}

module.exports = NegativeBinomialDistribution;