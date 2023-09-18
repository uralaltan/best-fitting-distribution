const Scorer = require("../../Scorer.js");

const scorer = new Scorer();
const betaTestData = [0.32959467579584184, 0.33930699633407224, 0.2502050749332346, 0.19685603522114178, 0.0442876952306047, 0.10983825219441334, 0.3059773634475039, 0.3491627262077964, 0.054318009571331705, 0.4238646641019199, 0.2963863789818734, 0.3434027861612391, 0.3008517261664285, 0.11772754061591269, 0.3988603783774352, 0.4062400062037195, 0.15977367975102633, 0.11970109953419851, 0.3036519416179476, 0.5568398648442695, 0.3161104904474824, 0.6055182501640242, 0.1398450080165595, 0.30744520220725596, 0.3491179435860378, 0.39437297339608324, 0.4901276771591554, 0.12112709657559202, 0.20544241688765266, 0.16734255962617878, 0.15404870190052086, 0.672795421006463, 0.09008163433495986, 0.4419285644978919, 0.0724330079045627, 0.03273815550661531, 0.08358317217511885, 0.5005327441523382, 0.40175295393412536, 0.34283694544006516, 0.166733175293429, 0.09648555828316811, 0.5445801173864672, 0.08002968110127649, 0.2450449682353012, 0.06098205451108568, 0.4085461912561739, 0.49829705787273737, 0.19329522744535, 0.15754139007854445, 0.25232506567783625, 0.6171293492391988, 0.7564098693751851, 0.3332874492478733, 0.1388804050665847, 0.13871184231942163, 0.6074227327454529, 0.3934712790501914, 0.457184932142367, 0.22430048412367698, 0.18508269708091804, 0.2287509890935366, 0.23825903621357405, 0.3588647145441718, 0.13411986552866315, 0.20554285194834154, 0.4136114893771512, 0.19882833189680024, 0.16123201679385415, 0.037720894429451916, 0.3787836929263559, 0.3426338951099141, 0.4510559268059475, 0.2972548907094657, 0.3908296720817396, 0.10668228465363792, 0.33094166257402097, 0.0796891995032622, 0.21428544490625198, 0.3123253039132726, 0.22727838692150576, 0.16803826174812772, 0.08542349950363787, 0.06685410199663483, 0.117502963063837, 0.22852936409796065, 0.35692180282813046, 0.41486319852294423, 0.3042627840764287, 0.36683433051323155, 0.15656806729427286, 0.15453396752178175, 0.40821674080829273, 0.1857088297254499, 0.21041933340068442, 0.34913797758925025, 0.10029006563577614, 0.5359833118160412, 0.18120333619440948, 0.4723836086313903];

test('Beta Distribution Chi Square Test', () => {
    expect(scorer.calculateScore(betaTestData)['Chi Square Results'][0][0]).toBe('Beta Distribution');
});

test('Beta Distribution MAE Test', () => {
    expect(scorer.calculateScore(betaTestData)['MAE Results'][0][0]).toBe('Beta Distribution');
});

test('Beta Distribution KS Test', () => {
    expect(scorer.calculateScore(betaTestData)['KSTest Results'][0][0]).toBe('Beta Distribution');
});