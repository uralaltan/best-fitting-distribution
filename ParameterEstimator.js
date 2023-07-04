const Math = require("mathjs");

class ParameterEstimator {

    estimateParameters(data){

        const parameters = {};

        const length = data.length;

        const mean = Math.mean(data);
        const variance = Math.variance(data); // 'uncorrected' denenebilir.

        // might get divided by zero error(when variance == 0) on some data so i added an epsilon value we can add that to variance if we want to prevent that.
        const eps = 1e-3;
        const alpha = Math.pow(mean, 2) / variance;
        const beta = mean / variance;
        const shape = alpha; 
        const scale = 1 / beta;

        const logData = data.map((x) => Math.log(x));
        const meanLog = logData.reduce((acc, val) => acc + val, 0) / logData.length;
        const stdDevLog = Math.sqrt(
            logData.reduce((acc, val) => acc + Math.pow(val - meanLog, 2), 0) / logData.length
        );

        const mu = meanLog;
        const sigma = stdDevLog;


        const lambda = mean;
        
        parameters['length'] = length;
        parameters['mean'] = mean;
        parameters['variance'] = variance;
        parameters['alpha'] = alpha;
        parameters['beta'] = beta;
        parameters['lambda'] = lambda;
        parameters['shape'] = shape;
        parameters['scale'] = scale;
        parameters['mu'] = mu;
        parameters['sigma'] = sigma;

        return parameters;

    }

}

module.exports = ParameterEstimator;