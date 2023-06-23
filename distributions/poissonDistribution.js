const Math = require("mathjs");
const { jStat } = require("jstat");
const Distribution = require('../distribution.js');

class PoissonDistribution extends Distribution {

    convert(data) {
        
        const factorial = (n) => {
            if (n === 0 || n === 1) {
              return 1;
            } else {
              let result = 1;
              for (let i = 2; i <= n; i++) {
                result *= i;
              }
              return result;
            }
          }
    
        const lambda = data.reduce((a, b) => a + b, 0) / data.length; // calculates mean of data
    
        const convertedData = data.map((k) => Math.exp(-lambda) * Math.pow(lambda, k) / factorial(k));

        return convertedData;

    }

    generateData(lambda, size) {       
      var randomArray = [];
      for (var i = 0; i < size; i++) {
          var randomNum = jStat.poisson.sample(lambda);
          randomArray.push(randomNum);
      }
      return randomArray;;
    }
}

module.exports = PoissonDistribution;