const Math = require("mathjs");
const Filter = require('../Filter.js');

class KSTest {
    
    constructor() {
        this.filter = new Filter();
    }

    binarySearchCDF = (data, value) => {
      let left = 0;
      let right = data.length - 1;
      
      while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (data[mid] === value) {
              return (mid + 1) / data.length;
          } else if (data[mid] < value) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      }
  
      return left / data.length;
    }
  
    getCriticalValue = (n1, n2, alpha) => {
        const factor = Math.sqrt((n1 + n2) / (n1 * n2));
        return factor;
    }

    // need a double check (formula generated from ai)
    calculateKS = (data, expected) => {
        //sort in ascending
        data.sort((a, b) => a - b);
        expected.sort((a, b) => a - b);

        let maxD = 0;
        for (let i = 0; i < data.length; i++) {
            const cdf1 = (i + 1) / data.length;
            const cdf2 = this.binarySearchCDF(expected, data[i]);
            const currentD = Math.abs(cdf1 - cdf2);
            if (currentD > maxD) {
                maxD = currentD;
            }
        }

        const alpha = 0.05; // Significance level (adjust as needed)
        const criticalValue = this.getCriticalValue(data.length, expected.length, alpha);

        const result = maxD <= criticalValue;

        return {
            statistic: maxD,
            criticalValue,
            pValue: result ? 1 : 0
        };

    }
    
    calculateBestFitScore = (data, testDatas) => {
        const KSResults = {};
    
        for (const testDataName in testDatas) {
            const scaledData = this.filter.scaleArray(testDatas[testDataName]);
            const { statistic } = this.calculateKS(data, scaledData);
            KSResults[testDataName] = statistic; // Store only the KS statistic.
        }
    
        const sortedKS = Object.entries(KSResults);
        sortedKS.sort((a, b) => a[1] - b[1]); // Sort by the KS statistic in ascending order.
    
        return sortedKS;
    }
    
}

module.exports = KSTest;