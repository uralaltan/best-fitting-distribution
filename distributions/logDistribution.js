const Math = require("mathjs");

class LogDistribution {
    convertToLogDistribution = (data, probability = 0.5) => {
        return data.map((x) => {
            if (x === 1) {
                return -Math.log(1 - probability);
            } else {
                return Math.pow(-Math.log(1 - probability), x - 1) * (-Math.log(1 - probability));
            }
        });
    };
  
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

/*

const logDistribution = new LogDistribution();

const generatedData = logDistribution.generateData(minValue=0.1, maxValue=10, size=50);
const convertedData = logDistribution.convertToLogDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = LogDistribution;