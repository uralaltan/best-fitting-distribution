const Math = require("mathjs");
const { jStat } = require("jstat");

class KS {

    calculateKS(data, cdf) {
      // Sort the data in ascending order
      const sortedData = data.slice().sort((a, b) => a - b);
  
      // Calculate the test statistic (D)
      let maxDifference = 0;
      for (let i = 0; i < sortedData.length; i++) {
        const empiricalCDF = (i + 1) / sortedData.length;
        const theoreticalCDF = cdf(sortedData[i]);
        const difference = Math.abs(empiricalCDF - theoreticalCDF);
        if (difference > maxDifference) {
          maxDifference = difference;
        }
      }
  
      return maxDifference;
    }

    poisson(data){

      const lambda = data.reduce((a, b) => a + b, 0) / data.length; // calculates mean of data

      const cdfPoisson = (x) => jStat.poisson.cdf(x, lambda);

      return this.calculateKS(data, cdfPoisson);

    }

    exponential(data){

      const mean = data.reduce((a, b) => a + b, 0) / data.length; // calculates mean of data
      const lambda = 1 / mean;

      const cdfExponential = (x) => jStat.exponential.cdf(x, lambda);

      return this.calculateKS(data, cdfExponential);

    }

    normal(data){

      const mean = data.reduce((a, b) => a + b, 0) / data.length;
      const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
      const stdDev = Math.sqrt(variance);

      const cdfNormal = (x) => jStat.normal.cdf(x, mean, stdDev);

      return this.calculateKS(data, cdfNormal);

    }

    lognormal(data){

      const logData = data.map((x) => Math.log(x));
      const meanLog = logData.reduce((acc, val) => acc + val, 0) / logData.length;
      const stdDevLog = Math.sqrt(
          logData.reduce((acc, val) => acc + Math.pow(val - meanLog, 2), 0) / logData.length
      );
      const mu = meanLog;
      const sigma = stdDevLog;

      const cdfLognormal = (x) => jStat.lognormal.cdf(x, mu, sigma);

      return this.calculateKS(data, cdfLognormal);

    }

    gamma(data){

      const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
      const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;

      const alpha = mean * ((mean * (1 - mean)) / variance - 1);
      const beta = (1 - mean) * ((mean * (1 - mean)) / variance - 1);

      const shape = alpha; 
      const scale = 1/beta;

      const cdfGamma = (x) => jStat.gamma.cdf(x, shape, scale);

      return this.calculateKS(data, cdfGamma);

    }

    beta(data){

      const minValue = Math.min(...data);
      const maxValue = Math.max(...data);
      const normalizedData = data.map(value => (value - minValue) / (maxValue - minValue));

      // Calculate the mean and variance of the normalized data (method of moments)
      const mean = normalizedData.reduce((sum, value) => sum + value, 0) / normalizedData.length;
      const variance = normalizedData.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / normalizedData.length;

      const alpha = mean * ((mean * (1 - mean)) / variance - 1);
      const beta = (1 - mean) * ((mean * (1 - mean)) / variance - 1);

      const cdfBeta = (x) => jStat.beta.cdf(x, alpha, beta);

      return this.calculateKS(data, cdfBeta);

    }

  }
  
module.exports = KS;