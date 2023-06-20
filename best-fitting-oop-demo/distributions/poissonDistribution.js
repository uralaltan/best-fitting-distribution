const Math = require("mathjs");
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
        const data = [];
      
        for (let i = 0; i < size; i++) {
            let L = Math.exp(-lambda);
            let k = 0;
            let p = 1;
        
            do {
                k++;
                let rand = Math.random();
                p *= rand;
            } while (p > L);
        
            data.push(k - 1);
        }
        return data;
    }
}

module.exports = PoissonDistribution;