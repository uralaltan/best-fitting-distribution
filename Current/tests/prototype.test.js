// const Filter = require('./Filter.js');
// const Normal = require('./distributions/normalDistribution.js');
// const Poisson = require('./distributions/poissonDistribution.js');
// const Exponential = require('./distributions/exponentialDistribution.js');
// const Gamma = require('./distributions/gammaDistribution.js');
// const LogNormal = require('./distributions/logNormalDistribution.js');
// const Beta = require('./distributions/betaDistribution.js');
// const Log = require('./distributions/logDistribution.js');
// const Binomial = require('./distributions/binomialDistribution.js');
// const NegativeBinomial = require('./distributions/negativeBinomialDistribution.js');

// constructor() {

//     this.filter = new Filter();
//     this.normal = new Normal();
//     this.poisson = new Poisson();
//     this.exponential = new Exponential();
//     this.gamma = new Gamma();
//     this.logNormal = new LogNormal();
//     this.beta = new Beta();
//     this.log = new Log();
//     this.binomial = new Binomial();
//     this.negativeBinomial = new NegativeBinomial();

//     this.testDatas = {
//         "Normal Distribution": [0.4967141530112327, -0.13826430117118466, 0.6476885381006925, 1.5230298564080254, -0.23415337472333597, -0.23413695694918055, 1.5792128155073915, 0.7674347291529088, -0.4694743859349521, 0.5425600435859647, -0.46341769281246226, -0.46572975357025687, 0.24196227156603412, -1.913280244657798, -1.7249178325130328, -0.5622875292409727, -1.0128311203344238, 0.3142473325952739, -0.9080240755212109, -1.4123037013352915, 1.465648768921554, -0.22577630048653566, 0.06752820468792384, -1.4247481862134568, -0.5443827245251827, 0.11092258970986608, -1.1509935774223028, 0.37569801834567196, -0.600638689918805, -0.2916937497932768, -0.6017066122293969, 1.8522781845089378, -0.013497224737933921, -1.0577109289559004, 0.822544912103189, -1.2208436499710222, 0.2088635950047554, -1.9596701238797756, -1.3281860488984305, 0.19686123586912352, 0.7384665799954104, 0.1713682811899705, -0.11564828238824053, -0.3011036955892888, -1.4785219903674274, -0.7198442083947086, -0.4606387709597875, 1.0571222262189157, 0.3436182895684614, -1.763040155362734, 0.324083969394795, -0.38508228041631654, -0.6769220003059587, 0.6116762888408679, 1.030999522495951, 0.9312801191161986, -0.8392175232226385, -0.3092123758512146, 0.33126343140356396, 0.9755451271223592, -0.47917423784528995, -0.18565897666381712, -1.1063349740060282, -1.1962066240806708, 0.812525822394198, 1.356240028570823, -0.07201012158033385, 1.0035328978920242, 0.36163602504763415, -0.6451197546051243, 0.36139560550841393, 1.5380365664659692, -0.03582603910995154, 1.5646436558140062, -2.6197451040897444, 0.8219025043752238, 0.08704706823817122, -0.29900735046586746, 0.0917607765355023, -1.9875689146008928, -0.21967188783751193, 0.3571125715117464, 1.477894044741516, -0.5182702182736474, -0.8084936028931876, -0.5017570435845365, 0.9154021177020741, 0.32875110965968446, -0.5297602037670388, 0.5132674331133561, 0.09707754934804039, 0.9686449905328892, -0.7020530938773524, -0.3276621465977682, -0.39210815313215763, -1.4635149481321186, 0.29612027706457605, 0.26105527217988933, 0.00511345664246089, -0.23458713337514692],
//         "Poisson Distribution": [3, 8, 2, 3, 5, 8, 3, 2, 5, 3, 8, 10, 3, 2, 5, 7, 6, 6, 2, 4, 9, 7, 11, 8, 3, 2, 3, 4, 5, 5, 4, 3, 8, 2, 1, 4, 5, 4, 3, 4, 8, 2, 2, 2, 7, 6, 7, 6, 7, 6, 4, 2, 3, 4, 7, 4, 3, 2, 6, 3, 5, 9, 6, 6, 9, 4, 9, 2, 10, 6, 9, 4, 1, 6, 8, 6, 2, 3, 5, 3, 3, 5, 6, 5, 3, 5, 3, 3, 6, 5, 6, 2, 4, 7, 6, 5, 4, 3, 3, 7],
//         "Exponential Distribution": [2.652556048220781, 1.775607071141798, 3.3531763894156916, 0.13272854183610555, 1.3125513634605075, 2.7861272652612405, 0.19995580970079768, 0.06881031747249687, 1.351393153188622, 0.8544271441986697, 1.8440771413214778, 0.1505582464141926, 1.586050111031868, 0.22517977306702294, 0.178715198965518, 0.1794446565599507, 1.6851032825640087, 1.094213639015969, 0.7403759563460444, 0.44446140167806814, 2.0972026672943325, 0.49831274969744493, 1.6960826628480696, 0.5782748811138804, 0.4731195658177371, 0.6211610598996026, 0.35864527543064206, 1.3767773129369394, 0.698602815695596, 0.26424253099706524, 2.2983398495505836, 0.4843317423587113, 0.7842823821777635, 2.3694956087096264, 0.9787993038573307, 0.12431461585777975, 2.810616683932209, 0.9880769289348262, 0.4078263155513094, 0.1499768206164258, 1.580001395680267, 0.9677755075628524, 0.7624138580490282, 2.2433033305364454, 1.553990013696072, 0.16449132012634088, 0.37356255139580047, 0.28566961854883793, 1.3623680618684115, 0.03410753985783793, 0.843713556386143, 1.4374137158597788, 2.093667344385938, 0.4186745935450927, 1.721807963541003, 0.11724388509877734, 1.8737439572116876, 0.13637963052807084, 0.5063146312098643, 1.59600536332649, 0.16242178992041617, 0.26039302244475093, 1.2810430976449054, 1.2730961719916947, 1.0248442087373908, 1.184001709087617, 0.7824691011956382, 0.2900836992594099, 0.4241831937932634, 0.20040127451653184, 2.3908761393236517, 0.8756090546365985, 0.5122456594790223, 0.6199075063211633, 2.942823736997211, 0.16646955012850068, 0.882444609108554, 0.7049944407931773, 0.9453443180030727, 0.018276180406497235, 2.0566935225406966, 2.689988536691252, 0.8327154639433977, 1.1928707405259582, 2.5574693578456262, 1.2283974533925182, 0.1655105091241217, 0.8587021498525602, 0.933220857034015, 0.5518745039228211, 1.333490303883392, 2.7236768857624747, 2.5978762130541173, 0.5993642963036176, 0.12017870455178419, 4.1891739891207065, 1.8257181108184428, 0.1331459597170634, 2.536307940963276, 2.0394239312268634],
//         "Gamma Distribution": [15.12363702967751, 4.877444018252139, 6.933809780163535, 2.043628345935723, 6.05355745967164, 0.21459691854881652, 7.805828680833462, 1.6351821555402382, 1.190105519466953, 2.963140324437967, 5.871670087371389, 2.9436633246458017, 1.3363530173963354, 4.853246239787027, 1.666477760256742, 2.9262965024145466, 1.8720805673027683, 3.733838133944038, 3.0455132065096238, 3.749874228841311, 15.345748937024325, 1.2140633152501221, 8.357700976886571, 0.10256587801427558, 1.1236682372224984, 3.8874370458202963, 2.9611325135385824, 4.890141086605507, 2.4835255009825725, 3.1568623422776185, 3.1082314422853443, 3.4113516370073333, 3.5948495661693656, 3.0079831197957714, 2.507388083957881, 2.775835700391066, 3.976651249704016, 4.0294619750387906, 1.9080453952599046, 1.4515926870235203, 0.6136293076555073, 10.281130560422882, 1.0455459517119818, 1.6386677382942878, 5.692429508914429, 0.8541329254845402, 2.1150261136651367, 6.524857637637114, 3.254036713655707, 12.569261471149316, 5.38781279666186, 0.990580095884182, 3.6004776961323612, 0.6478230625688891, 4.970918383617235, 2.2628074251187416, 4.887383539999911, 9.512468368279833, 9.254890151897406, 2.9415543441273626, 5.879786232061063, 2.5130910780042117, 3.8727416029988424, 0.7436579343053883, 1.6675701834642502, 5.04578435007251, 0.5462438565236011, 3.5855576635132187, 3.817303086517981, 5.161024281119866, 0.7482597661072442, 0.5972516537781046, 6.586867985348398, 3.8195888885619707, 2.5413449026607635, 0.7118890379984103, 2.402740587179775, 1.2396872769631142, 6.355280353938098, 0.955473301694254, 2.7826308119562118, 5.917959702160712, 5.199459719534028, 2.2936663667839814, 5.249207335814118, 5.924724416792654, 3.691007539550467, 4.6246557993871615, 2.812433227511821, 7.181028783848073, 3.129981991825561, 0.8623510629362552, 4.801568889140461, 1.3011597818517036, 7.841403209430585, 4.516091098108323, 0.42107607936957164, 6.11339658455725, 4.1188250813206615, 5.5354482585128215],
//         "Log Normal Distribution": [1.0237871119958357, 0.7720976671938495, 2.023186452129988, 3.1564534198229475, 0.834085569790071, 0.8003138940558795, 2.068228075571471, 2.2029251103874072, 0.7699497595685834, 0.8105085340089244, 0.8685828491856059, 0.5105711614410062, 0.6317092910079367, 0.605276207764039, 0.6812003730535189, 0.9828070709193211, 1.1242401286781656, 2.171135378034868, 0.6070300275475072, 1.6358477953710457, 0.8985306848791745, 0.9755714717406063, 1.4013131286860303, 0.5704321709543522, 1.210707468057051, 1.0867875078888334, 1.2791881667722367, 1.1555591298594319, 3.413199325125624, 0.7269700549945235, 0.7668236103729912, 0.7322961552174029, 0.7574948353966089, 0.727098324525672, 1.8121396343544731, 2.034504141300823, 0.7517336948988157, 0.6595629986285901, 1.2658043604785576, 0.7587283110375488, 1.3722694592328917, 1.1067873177993435, 0.4686626538572176, 2.1678862200317623, 2.4545386882119318, 0.7360962861458451, 0.8237808196979094, 1.1536521529129715, 1.1820242028911427, 1.3899560616738693, 2.7321866775846426, 0.915327262474062, 0.670890984603029, 0.5017468275945143, 0.6938739106176964, 0.9835729338674704, 2.452919460703876, 0.7719730417978209, 1.1183942775220101, 0.9918221738120914, 1.8115750073824954, 3.5376625517444666, 0.7668727584712101, 0.7829239444303435, 1.6855306474597591, 1.4062769409741682, 2.517719830792968, 1.3390549348792045, 0.8355659114793618, 1.3435661908679093, 1.7408122075977164, 1.507181108509939, 1.2887039398730669, 1.7046117032928212, 1.7943588925594276, 1.995868902293916, 1.3831381563083516, 0.9198367777589628, 1.076114472558098, 1.8280585156227624, 0.6646678508610152, 1.2024205551794338, 0.8214621587543203, 1.0144761911652234, 1.8950134408454133, 1.1002633211384434, 1.0234899164855722, 0.5066534343882413, 1.4522684511322417, 1.3809091554820956, 2.9494755109686928, 0.857367082766719, 1.1158039358828504, 1.132799317939127, 2.2005924947081916, 0.9534695721534097, 1.1497111798608788, 1.3551989293146571, 1.0977960308503774, 0.7999413973776784],
//         "Beta Distribution": [0.32959467579584184, 0.33930699633407224, 0.2502050749332346, 0.19685603522114178, 0.0442876952306047, 0.10983825219441334, 0.3059773634475039, 0.3491627262077964, 0.054318009571331705, 0.4238646641019199, 0.2963863789818734, 0.3434027861612391, 0.3008517261664285, 0.11772754061591269, 0.3988603783774352, 0.4062400062037195, 0.15977367975102633, 0.11970109953419851, 0.3036519416179476, 0.5568398648442695, 0.3161104904474824, 0.6055182501640242, 0.1398450080165595, 0.30744520220725596, 0.3491179435860378, 0.39437297339608324, 0.4901276771591554, 0.12112709657559202, 0.20544241688765266, 0.16734255962617878, 0.15404870190052086, 0.672795421006463, 0.09008163433495986, 0.4419285644978919, 0.0724330079045627, 0.03273815550661531, 0.08358317217511885, 0.5005327441523382, 0.40175295393412536, 0.34283694544006516, 0.166733175293429, 0.09648555828316811, 0.5445801173864672, 0.08002968110127649, 0.2450449682353012, 0.06098205451108568, 0.4085461912561739, 0.49829705787273737, 0.19329522744535, 0.15754139007854445, 0.25232506567783625, 0.6171293492391988, 0.7564098693751851, 0.3332874492478733, 0.1388804050665847, 0.13871184231942163, 0.6074227327454529, 0.3934712790501914, 0.457184932142367, 0.22430048412367698, 0.18508269708091804, 0.2287509890935366, 0.23825903621357405, 0.3588647145441718, 0.13411986552866315, 0.20554285194834154, 0.4136114893771512, 0.19882833189680024, 0.16123201679385415, 0.037720894429451916, 0.3787836929263559, 0.3426338951099141, 0.4510559268059475, 0.2972548907094657, 0.3908296720817396, 0.10668228465363792, 0.33094166257402097, 0.0796891995032622, 0.21428544490625198, 0.3123253039132726, 0.22727838692150576, 0.16803826174812772, 0.08542349950363787, 0.06685410199663483, 0.117502963063837, 0.22852936409796065, 0.35692180282813046, 0.41486319852294423, 0.3042627840764287, 0.36683433051323155, 0.15656806729427286, 0.15453396752178175, 0.40821674080829273, 0.1857088297254499, 0.21041933340068442, 0.34913797758925025, 0.10029006563577614, 0.5359833118160412, 0.18120333619440948, 0.4723836086313903],
//         "Log Distribution": [3, 1, 1, 2, 1, 4, 1, 1, 1, 1, 1, 2, 1, 3, 3, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3, 1, 1, 2, 3, 3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 2, 1, 3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 5, 1, 1, 1, 1, 1, 3, 3, 1, 1, 2, 1, 1],
//         "Binomial Distribution": [2, 8, 6, 4, 4, 4, 6, 6, 4, 4, 3, 6, 6, 4, 2, 3, 8, 4, 6, 6, 5, 4, 3, 5, 6, 6, 5, 2, 8, 6, 4, 8, 5, 5, 6, 6, 6, 3, 4, 7, 4, 4, 5, 5, 5, 7, 4, 3, 4, 7, 6, 4, 6, 7, 7, 7, 4, 6, 5, 7, 6, 6, 6, 4, 5, 8, 7, 2, 3, 3, 6, 6, 4, 5, 7, 6, 5, 5, 5, 4, 5, 6, 7, 6, 6, 3, 5, 1, 4, 6, 9, 3, 5, 6, 4, 5, 6, 5, 4, 4],
//         "Negative Binomial Distribution": [11, 8, 13, 17, 6, 22, 14, 8, 13, 4, 8, 10, 7, 7, 5, 17, 11, 9, 9, 11, 11, 12, 12, 11, 4, 19, 25, 9, 9, 17, 8, 6, 9, 11, 17, 10, 7, 3, 8, 12, 13, 11, 15, 14, 4, 7, 1, 14, 7, 9, 4, 5, 6, 13, 6, 2, 15, 13, 3, 5, 14, 4, 4, 13, 16, 10, 4, 4, 17, 16, 14, 17, 21, 12, 10, 20, 7, 12, 12, 6, 5, 12, 10, 19, 15, 11, 4, 3, 13, 9, 11, 7, 9, 10, 13, 5, 10, 8, 4, 9],
//     }
// }