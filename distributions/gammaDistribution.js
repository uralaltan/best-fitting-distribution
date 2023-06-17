const Math = require("mathjs");

class GammaDistribution {
    convertToGammaDistribution(data) {
        const shape = [1, 2, 3, 4, 5];
        const scale = [0.5, 1.0, 1.5, 2.0, 2.5];
        let bestShape = null;
        let bestScale = null;
        let lowestChiSquare = Infinity;
        let bestExpected = null;
    
        for (let shapeValue of shape) {
            for (let scaleValue of scale) {
                const expected = data.map((x) => {
                    return (Math.pow(x, shapeValue - 1) * Math.exp(-x / scaleValue)) /
                           (Math.pow(scaleValue, shapeValue) * this.factorial(shapeValue - 1));
                });
    
                const chiSquare = this.calculateChiSquare(data, expected);
    
                if (chiSquare < lowestChiSquare) {
                    lowestChiSquare = chiSquare;
                    bestShape = shapeValue;
                    bestScale = scaleValue;
                    bestExpected = expected;
                }
            }
        }
    
        console.log("Gamma Distribution Best Shape: ", bestShape);
        console.log("Gamma Distribution Best Scale: ", bestScale);
        return bestExpected;
    }
  
    factorial(n) {
        if (n === 0) return 1;
        return n * this.factorial(n - 1);
    }
  
    calculateChiSquare(observed, expected) {
        let chiSquare = 0;
        for (let i = 0; i < observed.length; i++) {
            chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
        }
        return chiSquare;
    }

    // Marsaglia and Tsang method
    generateData(shape, scale, size) {
        var result = [];
      
        for (var i = 0; i < size; i++) {
            var x = 0;
            var b = 0;
            var c = 0;
            var valid = false;
            
            if (shape >= 1) {
                b = shape - 1 / 3;
                c = 1 / Math.sqrt(9 * b);
                
                do {
                    do {
                        x = Math.random();
                        var v = 1 + c * x / Math.sqrt(b);
                        var u = Math.random();
                        
                        if (u < 1 - 0.0331 * Math.pow(x, 4) || Math.log(u) < 0.5 * Math.pow(x, 2) + b * (1 - v + Math.log(v))) {
                            valid = true;
                        }
                    } while (!valid);
                } while (shape < 1 && u >= Math.exp(-x));
            } else {
                var p = Math.exp(-shape);
                
                do {
                    var u = Math.random();
                    x = -Math.log((1 - u) / shape);
                    var y = -Math.log(Math.random());
                    
                    if (u < p * Math.pow(x, shape - 1) || Math.log(u) < x - 1) {
                        valid = true;
                    }
                } while (!valid);
            }
            
            result.push(scale * x);
        }
        
        return result;
    }
}

/*

const gammaDistribution = new GammaDistribution();

const generatedData = gammaDistribution.generateData(shape=2, scale=0.3, size=50);
const convertedData = gammaDistribution.convertToGammaDistribution(generatedData);

console.log(generatedData);
console.log(convertedData);

*/

module.exports = GammaDistribution;