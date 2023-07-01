const Gamma = require('../distributions/gammaDistribution');
const Jest = require('jest');

const sum = (a, b) => {
    return a + b
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});