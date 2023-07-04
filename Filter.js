class Filter {

    scaleArray = (data) => {
        const min = Math.min(...data);
        const max = Math.max(...data);
        
        const scaledData = data.map((value) => {
            return ((value - min) / (max - min));
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
}  

module.exports = Filter;