# Data-Distributions
Documentation of Distribution Calculations

## Creating Data Distributions
### Normal Distribution
This distribution is calculated by simply passing the data to the normal distribution formula.
After calculating mean and standard deviation data is passed individually to the function and calculated. Formula is shown below.\
![image](https://github.com/uralaltan/Data-Distributions/assets/112475938/7ccea6a2-ba12-4024-9067-19340e5ba623)

Example of how to write the formular directly:

$$
y = \frac{1}{\sigma \sqrt{2\pi}} e^{\frac{-(x-\mu)^2}{2\sigma^2}}
$$

Input format: 1d array ( [23, 15, 36, 17, 86] )\
Output format: 1d array ( [0.01355,0.01122, 0.01514,0.01186,0.00239] )

### Binomial distribution
This distribution is calculated with parameters data and probability.
For each individual data x in dataset where n=Number of Trials = data.length the formula is calculated. Formula is shown below.\
![image](https://github.com/uralaltan/Data-Distributions/assets/112475938/7e57c7e2-db3e-44c0-9194-92cb252e7626)\
Input format: 1d array ( [0, 3, 1, 2,] )\
Output format: 1d array ( [ 0.0625, 0.25, 0.25, 0.375 ] )

###	Poisson Distribution
This distribution has a parameter lambda. Inside the function this parameter has pre-defined values (1d-array ex: [0.25, 0.5, …, 2.5, 2.75, 3.0]). Then the distribution is calculated for each lambda parameter for chi-square test. After all lambda values are calculated best lambda value is selected. And that distribution is returned. Formula is shown below.\
![image](https://github.com/uralaltan/Data-Distributions/assets/112475938/a6bf7db4-c006-4924-8181-a9a1487e3104)\
Input format: 1d array ( [23, 15, 36, 17, 86] )\
Output format: 1d array ( [1.813e-13, 5.463e-7,  2.008e-26, 1.807e-8, 2.214e-91] )

###	Exponential Distribution
This distribution has a parameter lambda. Lambda value is calculated the same way in poisson distribution. After that the best distribution is returned. Formula is shown below.\
![image](https://github.com/uralaltan/Data-Distributions/assets/112475938/e83c4327-7f13-4c16-8d58-6f0bd0dd8802)\
Input format: X = 1d array ( [23, 15, 36, 17, 86] )\
Output format: 1d array ( [0.00079, 0.00587, 0.00003, 0.00356, 1.14976e-10] ) 

### Gamma Distribution
This distribution has alpha and beta parameters in his formula. Inside the function there is 2 lists named alphas and betas ex: Alphas: [1,2,3,4,5], Betas: [0.1, 0.2, 0.3, 0.4, 0.5]. Every alpha, beta combination is calculated and testes with chi-square test. Best one is returned. Formula is shown below.\
![image](https://github.com/uralaltan/Data-Distributions/assets/112475938/3037fa2e-5740-46b0-a438-a943c458e841) **where** ![image](https://github.com/uralaltan/Best-Fitting-Distribution/assets/112475938/b15dcd71-d455-45ba-bc81-8d8294775bd0)
\
Input format: X = 1d array ( [23, 15, 36, 17, 86] )\
Output format: 1d array ( [3.837e-18, 6.168e-12, 1.176e-28, 1.863e-13, 1.425e-70] ) 

###	Log-normal Distribution
This distribution has 2 parameters; mu and sigma. The function has pre-defined mu, sigma values. Function is iterated through them and finds the best mu, sigma with chi-square test. And then returns the best distribution. Formula is shown below.\
![image](https://github.com/uralaltan/Best-Fitting-Distribution/assets/112475938/8278a594-aa39-485c-a895-e81812913e9a)\
Input format: X = 1d array ( [23, 15, 36, 17, 86] )\
Output format: 1d array ( [3.837e-18, 6.168e-12, 1.176e-28, 1.863e-13, 1.425e-70] ) 
 
###	Beta Distribution
This distribution has parameters alpha and beta. They are calculated the same way as gamma distribution. The best distribution is returned. Formula is shown below.\
![image](https://github.com/uralaltan/Best-Fitting-Distribution/assets/112475938/f23a572f-ca0e-471c-a3d7-dc935b0d35d1)\
Input format: X = 1d array ( [1, 2, 3, 4, 5] )\
Output format: 1d array ( [ 0.5, 1, 1.5, 2, 2.5 ] ) 

###	Negative Binomial Distribution
This distribution has 2 parameters the number of successes required (r) and the probability of success (p). The distribution is calculated with the formula shown below.\
![image](https://github.com/uralaltan/Best-Fitting-Distribution/assets/112475938/37b50c7f-be5f-416d-9f88-e9b9534c6bff) **where** ![image](https://github.com/uralaltan/Best-Fitting-Distribution/assets/112475938/dd6b6872-c082-427b-a03f-0a26c07313f3)\
Input format: X = 1d array ( [1, 2, 3, 4, 5] )\
Output format: 1d array ( [ -0, 0, 0.125, 0.1875, 0.1875 ] ) 
 
###	Dirichlet Distribution
This distribution is calculated with multiple alpha pairs pre-defined inside the function. Formula is shown below.\
![image](https://github.com/uralaltan/Best-Fitting-Distribution/assets/112475938/e091df5e-ccad-4ae5-9129-dd2deacb64ec)\
Input format: X = 2d array ( [\
  [0.2, 0.3, 0.5],\
  [0.4, 0.4, 0.2],\
  [0.9, 0.7, 0.3],\
  [0.8, 0.6, 0.1],\
  [0.6, 0.3, 0.7],\
  [0.3, 0.9, 0.3],\
  [0.2, 0.1, 0.4],\
  [0.1, 0.2, 0.9],\
  [0.5, 0.4, 0.2],\
  [0.1, 0.6, 0.6],\
] )\
Output format: 1d array ( [\
  291.66569692151916,\
  278.7823327698314,\
  80.41683376577751,\
  209.8946487820816,\
  106.80973832002266,\
  145.5226917849383,\
  735.7109869470279,\
  417.0416969474759,\
  238.46697285100873,\
  256.7192776643844\
] )\
  
## Finding the closest distribution of a dataset
With the data, compare it to all distributions using some statistical measure such as sum of least squares, Kolgorov?
Determine the distribution that best fits the data and provide a ranked list of the goodness of fit of all distributions.
