import numpy as np
from scipy.stats import poisson, expon, gamma, lognorm, beta, logser

np.random.seed(42)

# Normal Distribution
normal_data = list(np.random.normal(loc=0, scale=1, size=100).ravel())

# Poisson Distribution
poisson_data = list(poisson.rvs(mu=5, size=100).ravel())

# Exponential Distribution
exponential_data = list(expon.rvs(scale=1, size=100).ravel())

# Gamma Distribution
gamma_data = list(gamma.rvs(a=2, scale=2, size=100).ravel())

# Lognormal Distribution
log_normal_data = list(lognorm.rvs(s=0.5, scale=1, size=100).ravel())

# Beta Distribution
beta_data = list(beta.rvs(a=2, b=5, size=100).ravel())

# Log Distribution
log_data = list(logser.rvs(p=0.5, size=100).ravel())

# Binomial Distribution
binomial_data = list(np.random.binomial(n=10, p=0.5, size=100).ravel())

# Negative Binomial Distribution
negative_binomial_data = list(np.random.negative_binomial(n=10, p=0.5, size=100).ravel())

print("const normalTestData =", normal_data)
print("const poissonTestData =", poisson_data)
print("const exponentialTestData =", exponential_data)
print("const gammaTestData =", gamma_data)
print("const logNormalTestData =", log_normal_data)
print("const betaTestData =", beta_data)
print("const logTestData =", log_data)
print("const binomialTestData =", binomial_data)
print("const negativeBinomialTestData =", negative_binomial_data)
