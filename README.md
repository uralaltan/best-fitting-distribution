# Data-Distributions
Documentation of Distribution Calculations

## Explanation of the library

The library has some dependicies but the most used one is [jStat](https://jstat.github.io/)

We have a ParameterEstimator.js class that gets the given array as input and returns the parameters of the array like mean, std, mu, sigma etc. We use these parameters to create data distributions.

Filter.js class has some filtering methods in it so far we have normalization, binning but more filtering methods can be added in the future work.

We have distributions file that contains Beta, Exponential, Gamma, LogNormal and Normal Distribution for now. All of the distributions classes has Distribution.js interface and they need to implement 'generateData' function. This function creates random number from the distribution with given parameters(which we get from ParameterEstimator).

In the StatTest folder we have test methods to check for how close the given input is to the given distribution data.

These are the small units of our logic. With the combination of these classes we implement the main logic in the Scorer.js class for getting the best fitted distribution for given input array.
The Scorer.js file works like this : 

1 - Get the parameters of the input array from ParameterEstimator.\
2 - Create distributions with these parameters with the help of generateData function.\
3 - Do a stat test for checking the best fitted distrbiution with given input and generated distributions so far we have MAE, MSE, RMSE, Kolmogorov-Smirnov Test, Chi-Square Test.\
4 - Do a ranking and return the results.

## The Tests

We used [jest](https://jestjs.io/) for testing. When typed "npm run test" in the console it runs all the .test.js files in the tests folder.
If you want to manually test the library you can use Main.js file. Of course this file will be removed in future work as we fully completed the project.
To run the test you can download the library and do a "npm install" to install the dependicies and then do "npm run test" to run the tests.

These .test files in the tests folder contains 2 type of test, one of the test type is checking whether or not the "generateData" function in the Distributions works.
The other one test the rankings in the Scorer.js it checks whether or not the given best fitted distribution by the Scorer.js is actually the best fitted distribution.

## Web API

server.js is the web api file it has a simple post method. Currently this file is written for the old code and will be updated in future.

## Plotting

plotting prototype folder contains the prototype of plotting logic(but needs more development). If we are going to serve this library as a website we can use plotting if not this file will be removed.
