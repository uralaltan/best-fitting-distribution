// This is a class for filtering the data. Right now it has only removeOutliers functionality. Additional features can be added.

class Filter{

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