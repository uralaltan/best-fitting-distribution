// Prototype of Kolmogorov-Smirnov Test
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
  }
  
  module.exports = KS;