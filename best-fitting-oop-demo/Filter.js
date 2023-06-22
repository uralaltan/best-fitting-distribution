// This is a class for filtering the data. Right now it has only removeOutliers functionality. Additional features can be added.

const { std } = require("mathjs");

class Filter{

  addMean(data) {
    const newData = [...data]
    const mean = newData.reduce((a, b) => a + b, 0) / newData.length;
    for(let i = 0; i< newData.length; i++){
      newData [i] +=mean;
    }
    return newData
  }

  subMean(data) {
    const newData = [...data]
      const mean = newData.reduce((a, b) => a + b, 0) / newData.length;
      for(let i = 0; i< newData.length; i++){
        newData [i] -=mean;
      }
      return newData;
  }

  multiplyMean(data) {
    const newData = [...data]
      const mean = newData.reduce((a, b) => a + b, 0) / newData.length;
      for(let i = 0; i< newData.length; i++){
        newData [i] *=mean;
      }

      return data;
  }

  divideMean(data) {
    const newData = [...data]
      const mean = newData.reduce((a, b) => a + b, 0) / newData.length;

      for(let i = 0; i< newData.length; i++){
        newData [i] /= mean;
      }
      return newData;
  }

  standarize(data) {
    const newData = [...data]
      const mean = newData.reduce((a, b) => a + b, 0) / newData.length;
      const stdDev = Math.sqrt(newData.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / newData.length);

      for(let i = 0; i< newData.length; i++){
        newData [i] = (newData [0] - mean) / stdDev;
      }

      return newData;
  }


    removeOutliers(data) {
    // Sort the data in ascending order
    const sortedData = data.slice().sort((a, b) => a - b);
  
    const q1Index = Math.floor(sortedData.length * 0.25);
    const q3Index = Math.floor(sortedData.length * 0.75);
        
    const q1 = sortedData[q1Index];
    const q3 = sortedData[q3Index];

    // Calculate the IQR
    const iqr = q3 - q1;
  
    // Define the lower and upper bounds for outliers
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
  
    // Filter out the outliers
    const filteredData = data.filter((value) => value >= lowerBound && value <= upperBound);
  
    return filteredData;
  }

}  

module.exports = Filter;