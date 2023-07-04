const gaussian = require('gaussian');
const Distribution = require('../Distribution.js');

class NormalDistribution extends Distribution {
    
    generateData = (size, mean, variance) => {

        const distribution = gaussian(mean, variance);
        const data = distribution.random(size);

        return data; 
    }
}

module.exports = NormalDistribution;