const Math = require("mathjs");

// ###########################################
// CALCULATE CHI SQUARE
// TEST
// ###########################################

const calculateChiSquare = (observed, expected) => {
  let chiSquare = 0;
  for (let i = 0; i < observed.length; i++) {
    chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
  }
  return chiSquare;
}

const fitDistribution = (data, distribution) => {
const observedCounts = new Array(distribution.length).fill(0);

// Count observed occurrences in data
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < distribution.length; j++) {
    if (data[i] === distribution[j]) {
      observedCounts[j]++;
      break;
    }
  }
}

const expectedCounts = new Array(distribution.length).fill(data.length / distribution.length);

const chiSquare = calculateChiSquare(observedCounts, expectedCounts);

return chiSquare;

}

// ###########################################
// CALCULATE DISTRIBUTIONS
// TEST
// ###########################################

const convertToNormalDistribution = (data) => {
  
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);

  const normalData = [];
  for (let i = 0; i < data.length; i++) {
    const ithNumber = Math.exp(Math.square((data[i] - mean) / stdDev) / (-2)) / (stdDev * Math.sqrt(2*Math.pi));
    normalData.push(ithNumber);
  }

  return normalData;
};

const convertToBinomialDistribution = (data, probability) => {
  trials = data.length;
  const binomialCoefficient = (n, k) => {
    const dp = Array.from(Array(n + 1), () => Array(k + 1).fill(0));

    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= Math.min(i, k); j++) {
        if (j === 0 || j === i) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
        }
      }
    }

    return dp[n][k];
  };

  const probabilities = data.map(k => {
    const coefficient = binomialCoefficient(trials, k);
    const q = 1 - probability;
    const binomialProbability = coefficient * Math.pow(probability, k) * Math.pow(q, trials - k);
    return binomialProbability;
  });

  return probabilities;
};

const convertToPoissonDistribution = (data) => {
  const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

  const lambdas = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0];
  let bestLambda = null;
  let lowestChiSquare = Infinity;
  let bestExpected = null;

  for (let lambda of lambdas) {
    const expected = data.map((number) => {
      return Math.pow(lambda, number) * Math.exp(-lambda) / factorial(number);
    });

    const chiSquare = calculateChiSquare(data, expected);

    if (chiSquare < lowestChiSquare) {
      lowestChiSquare = chiSquare;
      bestLambda = lambda;
      bestExpected = expected;
    }
  }

  return bestExpected;
};

const convertToExponentialDistribution = (data) => {
  const lambdas = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0];
  let bestLambda = null;
  let lowestChiSquare = Infinity;
  let bestExpected = null;

  for (let lambda of lambdas) {
    const expected = data.map((x) => {
      return lambda * Math.exp(-lambda * x);
    });

    const chiSquare = calculateChiSquare(data, expected);

    if (chiSquare < lowestChiSquare) {
      lowestChiSquare = chiSquare;
      bestLambda = lambda;
      bestExpected = expected;
    }
  }

  return bestExpected;
};

const convertToGammaDistribution = (data) => {
  const alphas = [1, 2, 3, 4, 5];
  const betas = [0.1, 0.2, 0.3, 0.4, 0.5];
  let bestAlpha = null;
  let bestBeta = null;
  let lowestChiSquare = Infinity;
  let bestExpected = null;

  for (let alpha of alphas) {
    for (let beta of betas) {
      const gammaFunction = (n) => {
        if (n === 1) {
          return 1;
        } else if (n === 0.5) {
          return Math.sqrt(Math.PI);
        } else {
          return (n - 1) * gammaFunction(n - 1);
        }
      };

      const expected = data.map((x) => {
        const coefficient = Math.pow(beta, alpha) / gammaFunction(alpha);
        const powerTerm = Math.pow(x, alpha - 1);
        const exponentialTerm = Math.exp(-x / beta);
        return coefficient * powerTerm * exponentialTerm;
      });

      const chiSquare = calculateChiSquare(data, expected);

      if (chiSquare < lowestChiSquare) {
        lowestChiSquare = chiSquare;
        bestAlpha = alpha;
        bestBeta = beta;
        bestExpected = expected;
      }
    }
  }

  return bestExpected;
};

const convertToLogDistribution = (data, probability) => {
  return data.map((x) => {
    if (x === 1) {
      return -Math.log(1 - probability);
    } else {
      return Math.pow(-Math.log(1 - probability), x - 1) * (-Math.log(1 - probability));
    }
  });
};

const convertToLogNormalDistribution = (data) => {
  const mus = [0, 1, 2];
  const sigmas = [0.1, 0.2, 0.3];
  let bestMu = null;
  let bestSigma = null;
  let lowestChiSquare = Infinity;
  let bestExpected = null;

  for (let mu of mus) {
    for (let sigma of sigmas) {
      const expected = data.map((x) => {
        const exponent = -Math.pow(Math.log(x) - mu, 2) / (2 * Math.pow(sigma, 2));
        const coefficient = 1 / (x * sigma * Math.sqrt(2 * Math.pi));
        return coefficient * Math.exp(exponent);
      });

      const chiSquare = calculateChiSquare(data, expected);

      if (chiSquare < lowestChiSquare) {
        lowestChiSquare = chiSquare;
        bestMu = mu;
        bestSigma = sigma;
        bestExpected = expected;
      }
    }
  }

  return bestExpected;
};

const convertToBetaDistribution = (data) => {
  const alphas = [2, 3, 4];
  const betas = [0.5, 1, 2];
  let bestAlpha = null;
  let bestBeta = null;
  let lowestChiSquare = Infinity;
  let bestExpected = null;

  const betaFunction = (x, y) => {
    if (x === 0 || y === 0) {
      return Infinity;
    } else {
      return (
        Math.exp(
          (Math.log(gammaFunction(x)) +
            Math.log(gammaFunction(y)) -
            Math.log(gammaFunction(x + y)))
        ) /
        (gammaFunction(x) * gammaFunction(y))
      );
    }
  };

  const gammaFunction = (n) => {
    if (n === 1) {
      return 1;
    } else if (n === 0.5) {
      return Math.sqrt(Math.pi);
    } else {
      return (n - 1) * gammaFunction(n - 1);
    }
  };

  for (let alpha of alphas) {
    for (let beta of betas) {
      const expected = data.map((x) => betaFunction(alpha, beta) * Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1));

      const chiSquare = calculateChiSquare(data, expected);

      if (chiSquare < lowestChiSquare) {
        lowestChiSquare = chiSquare;
        bestAlpha = alpha;
        bestBeta = beta;
        bestExpected = expected;
      }
    }
  }

  return bestExpected;
};

const convertToNegativeBinomialDistribution = (data, successesRequired, probabilityOfSuccess) => {
  const binomialCoefficient = (n, k) => {
    let coefficient = 1;
    for (let i = 0; i < k; i++) {
      coefficient *= (n - i) / (i + 1);
    }
    return coefficient;
  };

  return data.map((x) => {
    const probability = Math.pow(probabilityOfSuccess, successesRequired) * Math.pow(1 - probabilityOfSuccess, x - successesRequired);
    const coefficient = binomialCoefficient(x - 1, successesRequired - 1);
    return coefficient * probability;
  });
};

const convertToDirichletDistribution = (data) => {
  const alphas = [
    [0.3, 0.3, 0.3], 
    [0.5, 0.5, 0.5],
    [0.5, 0.2, 0.1]
  ]; // Define multiple alpha values as a 2D array

  const sumArray = (arr) => {
    return arr.reduce((sum, value) => sum + value, 0);
  };

  const calculateChiSquare = (observed, expected) => {
    let chiSquare = 0;
    for (let i = 0; i < observed.length; i++) {
      chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
    }
    return chiSquare;
  };

  let bestDistribution;
  let minChiSquare = Number.MAX_VALUE;

  for (let i = 0; i < alphas.length; i++) {
    const alpha = alphas[i];
    const dirichletConstant = alpha.reduce((product, value) => product * Math.gamma(value), 1) / Math.gamma(sumArray(alpha));

    const distribution = data.map((values) => {
      let product = 1;
      for (let i = 0; i < values.length; i++) {
        product *= Math.pow(values[i], alpha[i] - 1);
      }
      return dirichletConstant * product;
    });

    const observedCounts = new Array(distribution.length).fill(0);

    // Count observed occurrences in data
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < distribution.length; j++) {
        if (data[i] === distribution[j]) {
          observedCounts[j]++;
          break;
        }
      }
    }

    const expectedCounts = new Array(distribution.length).fill(data.length / distribution.length);

    const chiSquare = calculateChiSquare(observedCounts, expectedCounts);

    if (chiSquare < minChiSquare) {
      minChiSquare = chiSquare;
      bestDistribution = distribution;
    }
  }

  return bestDistribution;
};


const data = [1, 2, 3, 4, 5];
const data2 = [
  [0.2, 0.3, 0.5],
  [0.4, 0.4, 0.2],
  [0.9, 0.7, 0.3],
  [0.8, 0.6, 0.1],
  [0.6, 0.3, 0.7],
  [0.3, 0.9, 0.3],
  [0.2, 0.1, 0.4],
  [0.1, 0.2, 0.9],
  [0.5, 0.4, 0.2],
  [0.1, 0.6, 0.6],
];

const normalData = convertToNormalDistribution(data);
console.log("Normal Distribution:", normalData);

const binomialData = convertToBinomialDistribution(data, probability=0.5);
console.log("Binomial Distribution:", binomialData);

const poissonData = convertToPoissonDistribution(data);
console.log("Poisson Distribution:", poissonData);

const exponentialData = convertToExponentialDistribution(data);
console.log("Exponential Distribution:", exponentialData);

const gammaData = convertToGammaDistribution(data);
console.log("Gamma Distribution:", gammaData);

const logData = convertToLogDistribution(data, probability=0.5);
console.log("Log Distribution:", logData);

const logNormalData = convertToLogNormalDistribution(data);
console.log("Log-normal Distribution:", logNormalData);

const betaData = convertToBetaDistribution(data);
console.log("Beta Distribution:", betaData);

const negativeBinomialData = convertToNegativeBinomialDistribution(data, successesRequired=3, probabilityOfSuccess=0.5);
console.log("Negative Binomial Distribution:", negativeBinomialData);

const dirichletData = convertToDirichletDistribution(data2);
console.log("Dirichlet Distribution:", dirichletData);


const distributions = [
  convertToNormalDistribution(data),
  convertToBinomialDistribution(data, probability=0.5),
  convertToPoissonDistribution(data),
  convertToExponentialDistribution(data),
  convertToGammaDistribution(data),
  convertToLogDistribution(data, probability=0.5),
  convertToLogNormalDistribution(data),
  convertToBetaDistribution(data),
  convertToNegativeBinomialDistribution(data, successesRequired=3, probabilityOfSuccess=0.5),
  convertToDirichletDistribution(data2),
];

const numberOfTests = 1000;
let chiSquareResults = {};

for (let i = 0; i < numberOfTests; i++) {
  let bestFitIndex = -1;
  let bestFitChiSquare = Infinity;

  for (let j = 0; j < distributions.length; j++) {
    const chiSquare = fitDistribution(data, distributions[j]);

    if (chiSquare < bestFitChiSquare) {
      bestFitChiSquare = chiSquare;
      bestFitIndex = j;
    }
  }

  if (bestFitIndex !== -1) {
    if (!chiSquareResults[bestFitIndex]) {
      chiSquareResults[bestFitIndex] = 0;
    }
    chiSquareResults[bestFitIndex]++;
  }
}

let mostFrequentIndex = -1;
let mostFrequentCount = -Infinity;

for (const index in chiSquareResults) {
  const count = chiSquareResults[index];
  if (count > mostFrequentCount) {
    mostFrequentCount = count;
    mostFrequentIndex = index;
  }
}

console.log(`Most frequent best fitted distribution index: ${mostFrequentIndex}`);
