const Math = require("mathjs");
const Distribution = require('../distribution.js');

class GammaDistribution extends Distribution {
    
    // TODO
    convert(data) {
        
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

module.exports = GammaDistribution;