var AmberMock = artifacts.require("AmberMock");
var ForwardMock = artifacts.require("ForwardMock");
var BadgeFactoryMock = artifacts.require("BadgeFactoryMock");

var Amber = artifacts.require("Amber");
var LegacyAmber = artifacts.require("LegacyAmber");
var BadgeFactory = artifacts.require("BadgeFactory");
var PureAmber = artifacts.require("PureAmber");
var SafeMathExt = artifacts.require("SafeMathExt");
var TeamAmber = artifacts.require("TeamAmber");
var MultiSigWallet = artifacts.require("MultiSigWallet");

module.exports = function(deployer, network) {
	const FINNEY = 10**15;

	const _admin = "0x1740E5400A0D66bc6dE97f1146Db4aFBbC3fb39D";

	const _XXChan = "0x4cF1D6683bD4385B0Ab1da720597083a1C28133f";
	const _maChan = "0x5cCA13c9016D236459666c74AeaFce90d618b3e4";
	const _juChan = "0x70381665553939b0A8Cce1379524970389847537";
	const _tiChan = "0x8536F40B7DAC1AB13D268e0B7E672787c0A3F57f";
	const _soChan = "0xEd7aF2D6eD334B88B010B1810e16F7EB6D5CEf34";
	const _kuChan = "0x4F836cAaeC0f11EA5fd20b45Bb355D07b45DE4a3";
	const _xaChan = "0x7D7217701Bd187eD204b37374abcB612Aac0476B";

	/// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    //constructor(address[] _owners, uint _required)
    deployer.deploy(MultiSigWallet, [_maChan, _juChan], 2);
    deployer.deploy(SafeMathExt);

    deployer.link(SafeMathExt, PureAmber);
    deployer.deploy(PureAmber);

    deployer.link(PureAmber, Amber);
		deployer.link(PureAmber, LegacyAmber)

    if (network == "development") {
    	deployer.deploy(AmberMock);
    	deployer.deploy(ForwardMock);

        deployer.link(SafeMathExt, BadgeFactoryMock);

    	deployer.deploy(TeamAmber, _XXChan, _maChan, _juChan, _tiChan, _soChan, _kuChan, _xaChan, 29, 22, 15, 5, 5, 2).then(function(){
    		deployer.deploy(Amber, _admin, TeamAmber.address).then(function() {
    			return deployer.deploy(BadgeFactoryMock, Amber.address);
    		});
				deployer.deploy(LegacyAmber, _admin, TeamAmber.address).then(function() {
    			return deployer.deploy(BadgeFactoryMock, LegacyAmber.address);
    		});
    	})
    } else {
        deployer.link(SafeMathExt, BadgeFactory);
    	deployer.deploy(TeamAmber, _XXChan, _maChan, _juChan, _tiChan, _soChan, _kuChan, _xaChan, 29, 22, 15, 5, 5, 2).then(function(){
    		deployer.deploy(Amber, _admin, TeamAmber.address).then(function() {
    			return deployer.deploy(BadgeFactory, Amber.address);
    		});
				deployer.deploy(LegacyAmber, _admin, TeamAmber.address).then(function() {
    			return deployer.deploy(BadgeFactory, LegacyAmber.address);
    		});
    	})
    }
};
