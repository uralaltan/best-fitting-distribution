const Math = require("mathjs");
const { jStat } = require("jstat");
const Distribution = require('../distribution.js');

class ExponentialDistribution extends Distribution {

    convert = (data, lambda=2) => {
    
        const simpleLinearTransformation = (data) => {
            const minValue = Math.min(...data);
            const maxValue = Math.max(...data);

            const scaledData = data.map((value) => {
                return ((value - minValue) / (maxValue - minValue)) * 2;
            });

            return scaledData;
        }
        
        const scaledData = simpleLinearTransformation(data);

        const poissonData = scaledData.map((value) => {
            if (value < 0) {
                return 0;
            }
            return (lambda * Math.exp(-lambda * value));
        });
        
        return poissonData;
    }

    generateData = (size, lambda=2) => {

        const data = [];
        for (let i = 0; i < size; i++) {
            const sampleData = jStat.exponential.sample(lambda);
            data.push(sampleData);
        }

        return data;
    }
}

module.exports = ExponentialDistribution;