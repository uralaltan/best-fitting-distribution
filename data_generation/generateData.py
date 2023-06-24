import numpy as np
from scipy.stats import poisson, expon, gamma, lognorm, beta

# Set the random seed for reproducibility
np.random.seed(42)

# Generate data from the Normal distribution
normal_data = list(np.random.normal(loc=0, scale=1, size=100).ravel())

# Generate data from the Poisson distribution
poisson_data = list(poisson.rvs(mu=5, size=100).ravel())

# Generate data from the Exponential distribution
exponential_data = list(expon.rvs(scale=1, size=100).ravel())

# Generate data from the Gamma distribution
gamma_data = list(gamma.rvs(a=2, scale=2, size=100).ravel())

# Generate data from the Lognormal distribution
lognormal_data = list(lognorm.rvs(s=0.5, scale=1, size=100).ravel())

# Generate data from the Beta distribution
beta_data = list(beta.rvs(a=2, b=5, size=100).ravel())

print("Normal data is:")
print(normal_data)
print("poisson data is:")
print(poisson_data)
print("expo data is:")
print(exponential_data)
print("gamma data is:")
print(gamma_data)
print("lognormal data is:")
print(lognormal_data)
print("beta data is:")
print(beta_data)