const Math = require("mathjs");
const { jStat } = require("jstat");

const Distribution = require("../distribution");

class BetaDistribution extends Distribution {

    // might comeback to this but looks solid for now.
    convert(data) {
        // MinMaxScaling because beta distribution works in [0,1] range.
        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);
        const normalizedData = data.map(value => (value - minValue) / (maxValue - minValue));

        // Calculate the mean and variance of the normalized data (method of moments)
        const mean = normalizedData.reduce((sum, value) => sum + value, 0) / normalizedData.length;
        const variance = normalizedData.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / normalizedData.length;

        const alpha = mean * ((mean * (1 - mean)) / variance - 1);
        const beta = (1 - mean) * ((mean * (1 - mean)) / variance - 1);

        const samples = normalizedData.map(() => {
            const u = Math.random();
            const v = Math.random();
            const x = Math.pow(u, 1 / alpha);
            const y = Math.pow(v, 1 / beta);
            return x / (x + y);
        });
        
        // Denormalize the samples back to the original range
        const denormalizedSamples = samples.map(value => value * (maxValue - minValue) + minValue);
        
        return denormalizedSamples;
    }

    generateData(alpha, beta, size) {
        var randomArray = [];
        for (var i = 0; i < size; i++) {
            var randomNum = jStat.beta.sample(alpha, beta);
            randomArray.push(randomNum);
        }
        return randomArray;
    }
}

module.exports = BetaDistribution;