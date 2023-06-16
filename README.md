# Data-Distributions

Documentation of Distribution Calculations
Data Distributions
•	Normal Distribution: This distribution is calculated by simply passing the data to the normal distribution formula. The formula is shown below.
 

After calculating mean and standard deviation. Datas from dataset is passed individually to the function and calculated. 
Input format: 1d array ( [23, 15, 36, 17, 86] )
Output format: 1d array ( [0.01355,0.01122, 0.01514,0.01186,0.00239] )

•	Binomial distribution: This distribution is calculated with parameters data and probability. The formula is shown below.
 
For each individual data x in dataset where n=Number of Trials = data.length the formula is calculated and calculated.
Input format: 1d array ( [0, 3, 1, 2,] )
Output format: 1d array ( [ 0.0625, 0.25, 0.25, 0.375 ] )

•	Poisson Distribution: This distribution has a parameter lambda. Inside the function this parameter has pre-defined values (1d-array ex: [0.25, 0.5, …, 2.5, 2.75, 3.0]). Then the distribution is calculated for each lambda parameter for chi-square test. After all lambda values are calculated best lambda value is selected. And that distribution is returned. Formula is shown below.
 
Input format: X = 1d array ( [23, 15, 36, 17, 86] ) where k = data[i]
Output format: 1d array ( [1.813e-13, 5.463e-7,  2.008e-26, 1.807e-8, 2.214e-91] )

•	Exponential Distribution: This distribution has a parameter lambda. Lambda value is calculated the same way in poisson distribution. After that the best distribution is returned. Formula is shown below. 
 
Input format: X = 1d array ( [23, 15, 36, 17, 86] )
Output format: 1d array ( [0.00079, 0.00587, 0.00003, 0.00356, 1.14976e-10] ) 

•	Gamma Distribution: This distribution has alpha and beta parameters in his formula. Inside the function there is 2 lists named alphas and betas ex: Alphas: [1,2,3,4,5], Betas: [0.1, 0.2, 0.3, 0.4, 0.5]. Every alpha, beta combination is calculated and testes with chi-square test. Best one is returned.
 
where,
 
Input format: X = 1d array ( [23, 15, 36, 17, 86] )
Output format: 1d array ( [3.837e-18, 6.168e-12, 1.176e-28, 1.863e-13, 1.425e-70] ) 

•	Log-normal Distribution: This distribution has 2 parameters; mu and sigma. The function has pre-defined mu, sigma values. Function iterated thorough them and finds the best mu, sigma with chi-square test. And then returns the best distribution. Formula is shown below.
 

•	Beta Distribution: This distribution has parameters alpha and beta. They are calculated the same way as gamma distribution. The best distribution is returned. Formula is shown below.
 

•	Negative Binomial Distribution: This distribution has 2 parameters the number of successes required (r) and the probability of success (p). This distribution is calculated with the formula shown below.
 
where,


 
•	Dirichlet Distribution: This distribution is calculated with multiple alpha pairs pre-defined inside the function. Formula is shown below.
 
