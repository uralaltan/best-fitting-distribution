const Math = require("mathjs");
const Distribution = require('../distribution.js');

class LogDistribution extends Distribution {
    // What is log distribution =?
    convert(data){
        return data;
    }
  
    generateData = (minValue, maxValue, size) => {
        const data = [];
        const base = 10;
      
        for (let i = 0; i < size; i++) {
            const logValue = Math.random();
            const value = Math.pow(base, Math.log(minValue) + logValue * (Math.log(maxValue) - Math.log(minValue)));
            data.push(value);
        }
      
        return data;
    }
}

module.exports = LogDistribution;