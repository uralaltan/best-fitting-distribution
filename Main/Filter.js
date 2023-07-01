class Filter{

    scaleArray = (data) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
        
        const scaledData = data.map((value) => {
            const scaledValue = ((value - min) / (max - min)) * 999 + 1;
            return scaledValue // Math.round(scaledValue);
        });
        
        return scaledData;
    }

    convertToBins = (data, k) => {
      
        var binDataMean = [];
        var binData = [];
        
        for (let i = 0; i < data.length / k; i++) {

            var tempList = [];

            var sum = 0;
            for (let j = 0; j < k; j++) {

            tempList.push(data[j+ k*i])

            sum += data[j+ k*i]
            }

            sum /= k
            

            binDataMean.push(Math.round(sum));
            binData.push(tempList);

        }
        return binDataMean;
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

    shiftDistribution(data, shiftAmount){
        return data.map((value) => value + shiftAmount);
    }

    scaleDistribution(data, scaleFactor){
        return data.map((value) => value * scaleFactor);
    }

    standardizeDistribution(data){
        const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
        const stdDev = Math.sqrt(
            data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length
        );
        return data.map((value) => (value - mean) / stdDev);
    }
}  

module.exports = Filter;