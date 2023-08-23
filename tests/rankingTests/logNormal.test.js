const Scorer = require("../../Scorer.js");

const scorer = new Scorer();
const logNormalTestData = [1.0237871119958357, 0.7720976671938495, 2.023186452129988, 3.1564534198229475, 0.834085569790071, 0.8003138940558795, 2.068228075571471, 2.2029251103874072, 0.7699497595685834, 0.8105085340089244, 0.8685828491856059, 0.5105711614410062, 0.6317092910079367, 0.605276207764039, 0.6812003730535189, 0.9828070709193211, 1.1242401286781656, 2.171135378034868, 0.6070300275475072, 1.6358477953710457, 0.8985306848791745, 0.9755714717406063, 1.4013131286860303, 0.5704321709543522, 1.210707468057051, 1.0867875078888334, 1.2791881667722367, 1.1555591298594319, 3.413199325125624, 0.7269700549945235, 0.7668236103729912, 0.7322961552174029, 0.7574948353966089, 0.727098324525672, 1.8121396343544731, 2.034504141300823, 0.7517336948988157, 0.6595629986285901, 1.2658043604785576, 0.7587283110375488, 1.3722694592328917, 1.1067873177993435, 0.4686626538572176, 2.1678862200317623, 2.4545386882119318, 0.7360962861458451, 0.8237808196979094, 1.1536521529129715, 1.1820242028911427, 1.3899560616738693, 2.7321866775846426, 0.915327262474062, 0.670890984603029, 0.5017468275945143, 0.6938739106176964, 0.9835729338674704, 2.452919460703876, 0.7719730417978209, 1.1183942775220101, 0.9918221738120914, 1.8115750073824954, 3.5376625517444666, 0.7668727584712101, 0.7829239444303435, 1.6855306474597591, 1.4062769409741682, 2.517719830792968, 1.3390549348792045, 0.8355659114793618, 1.3435661908679093, 1.7408122075977164, 1.507181108509939, 1.2887039398730669, 1.7046117032928212, 1.7943588925594276, 1.995868902293916, 1.3831381563083516, 0.9198367777589628, 1.076114472558098, 1.8280585156227624, 0.6646678508610152, 1.2024205551794338, 0.8214621587543203, 1.0144761911652234, 1.8950134408454133, 1.1002633211384434, 1.0234899164855722, 0.5066534343882413, 1.4522684511322417, 1.3809091554820956, 2.9494755109686928, 0.857367082766719, 1.1158039358828504, 1.132799317939127, 2.2005924947081916, 0.9534695721534097, 1.1497111798608788, 1.3551989293146571, 1.0977960308503774, 0.7999413973776784];

test('Log Normal Distribution Chi Square Test', () => {
    expect(scorer.calculateScore(logNormalTestData)['Chi Square Results'][0][0]).toBe('Log Normal Distribution');
});

test('Log Normal Distribution MAE Test', () => {
    expect(scorer.calculateScore(logNormalTestData)['MAE Results'][0][0]).toBe('Log Normal Distribution');
});

test('Log Normal Distribution RMSE Test', () => {
    expect(scorer.calculateScore(logNormalTestData)['RMSE Results'][0][0]).toBe('Log Normal Distribution');
});

test('Log Normal Distribution MSE Test', () => {
    expect(scorer.calculateScore(logNormalTestData)['MSE Results'][0][0]).toBe('Log Normal Distribution');
});