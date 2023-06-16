const Math = require("mathjs");

// Calculate Chi Square
const calculateChiSquare = (observed, expected) => {
  let chiSquare = 0;
    for (let i = 0; i < observed.length; i++) {
      chiSquare += Math.pow(observed[i] - expected[i], 2) / expected[i];
    }
    return chiSquare;
}

// Calculate Ranks of Distributions
const chiSquareGoodnessOfFit = (observed, expected) => {
  const numCategories = observed.length;
  const distributionNames = Object.keys(expected);
  const numDistributions = distributionNames.length;

  // Calculate the total observed frequency
  const totalObserved = observed.reduce((sum, value) => sum + value, 0);

  // Calculate the degrees of freedom
  const df = numCategories - 1;

  // Calculate the scores and ranks
  const scores = distributionNames.map((distributionName) => {
    const distributionData = expected[distributionName];

    // Calculate the expected frequencies based on the distribution
    const expectedFreq = distributionData.map((prob) => prob * totalObserved);

    // Calculate the chi-square test statistic
    const score = observed.reduce((sum, value, categoryIndex) => {
      const expected = expectedFreq[categoryIndex];
      const difference = value - expected;
      return sum + (difference * difference) / expected;
    }, 0);

    return { distributionName, score };
  });

  // Sort the scores in ascending order
  scores.sort((a, b) => a.score - b.score);

  // Assign ranks to the distributions
  const ranks = scores.map((score, index) => {
    const rank = index + 1;
    return { ...score, rank };
  });

  // Prepare the result object
  const result = {};
  ranks.forEach((rank) => {
    const { distributionName, score, rank: distributionRank } = rank;
    result[distributionName] = { score, rank: distributionRank };
  });

  return result;
}

// Calculate Distributions
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

const convertToBinomialDistribution = (data, probability=0.5) => {
  trials = data.length;
  const binomialCoefficient = (n, k) => {
    const dp = Array.from(Array(n + 1), () => Array(k + 1).fill(0));

    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= Math.min(i, k); j++) {
        if (j === 0 || j === i) {
          dp[i][j] = 1;
        } 
        else {
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

  const lambdas = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0];
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
  console.log("Poisson Distribution Best Lambda: ", bestLambda);
  return bestExpected;
};

const convertToExponentialDistribution = (data) => {
  const lambdas = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0];
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
  console.log("Exponential Distribution Best Lambda: ", bestLambda);
  return bestExpected;
};

const convertToGammaDistribution = (data) => {
  const alphas = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
  const betas = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
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
          return Math.sqrt(Math.pi);
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
  console.log("Gamma Distribution Best Alpha: ", bestAlpha, "Best Beta: ", bestBeta);
  return bestExpected;
};

const convertToLogDistribution = (data, probability=0.5) => {
  return data.map((x) => {
    if (x === 1) {
      return -Math.log(1 - probability);
    } else {
      return Math.pow(-Math.log(1 - probability), x - 1) * (-Math.log(1 - probability));
    }
  });
};

const convertToLogNormalDistribution = (data) => {
  const logData = data.map((x) => Math.log(x));
  const meanLog = logData.reduce((acc, val) => acc + val, 0) / logData.length;
  const stdDevLog = Math.sqrt(
    logData.reduce((acc, val) => acc + Math.pow(val - meanLog, 2), 0) / logData.length
  );
  const mu = meanLog;
  const sigma = stdDevLog;

  const expected = data.map((x) => {
    const exponent = -Math.pow(Math.log(x) - mu, 2) / (2 * Math.pow(sigma, 2));
    const coefficient = 1 / (x * sigma * Math.sqrt(2 * Math.pi));
    return coefficient * Math.exp(exponent);
  });

  return expected;
};

const convertToBetaDistribution = (data) => {
  const alphas = [1, 2, 3, 4, 5];
  const betas = [0.5, 1, 1.5, 2, 2.5];
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
  console.log("Beta Distribution Best Alpha: ", bestAlpha, "Best Beta: ", bestBeta);
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


const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

/*
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
*/

const distributions = {
  "Normal Distribution": convertToNormalDistribution(data),
  "Binomial Distribution": convertToBinomialDistribution(data, probability=0.5),
  "Poisson Distribution": convertToPoissonDistribution(data),
  "Exponential Distribution": convertToExponentialDistribution(data),
  "Gamma Distribution": convertToGammaDistribution(data),
  "Log Distribution": convertToLogDistribution(data, probability=0.5),
  "Log Normal Distribution": convertToLogNormalDistribution(data),
  "Beta Distribution": convertToBetaDistribution(data),
  "Negative Binomial Distribution": convertToNegativeBinomialDistribution(data, successesRequired=3, probabilityOfSuccess=0.5)
};

ranks = chiSquareGoodnessOfFit(data, distributions);

console.log(ranks);
