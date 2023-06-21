const Math = require("mathjs");

class ShiftOperations {
    addMean(data) {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        return data + mean;
    }

    subMean(data) {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        return data - mean;
    }

    multiplyMean(data) {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        return data*mean;
    }

    divideMean(data) {
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        return data / mean;
    }

    standarize(data) {
        const stdDev = Math.std(data);
        const mean = data.reduce((a, b) => a + b, 0) / data.length;
        return (data - mean) / stdDev;
    }
}

module.exports = ShiftOperations;
