// See <http://truffleframework.com/docs/advanced/configuration>
// for more about customizing your Truffle configuration!

module.exports = {
	//contracts_build_directory: "./output",
	networks: {
		development: {
			host: "127.0.0.1",
      		port: 7545, // 7545: Ganache RPC, 8545 TestRPC, 9545 Truffle Dev
      		network_id: "*" // Match any network id
      	},
      	ropsten: {
      		provider: function() {
      			return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/");
      		},
      		network_id: '3',
      	},
      	live: {
    		host: "178.25.19.88", // Random IP for example purposes (do not use)
    		port: 80,
    		network_id: 1,        // Ethereum public network
    		// optional config values:
    		// gas - Default is 4712388.
    		// gasPrice - Default is 100000000000 (100 Shannon).
    		// from - default address to use for any transaction Truffle makes during migrations
    		// provider - web3 provider instance Truffle should use to talk to the Ethereum network.
    		//          - function that returns a web3 provider instance (see below.)
    		//          - if specified, host and port are ignored.
    	}
    }
};