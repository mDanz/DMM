import Web3 from 'web3'
import GlobalJson from '../../Global.json'

export async function setupWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
       await window.ethereum.enable();
       console.log('Used new interface.');
    } catch (error) {
       console.error('User denied access to Blockchain!');
    }
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    console.log('Used old interface.');
  }
  else {
    console.log('Non-Ethereum browser detected. Install MetaMask!');
  }
}

export async function getWeb3() {
  if (!window.web3) {
    await setupWeb3();
  }
  return window.web3;
}

export async function updateDefaultAccount() {
  const web3 = await getWeb3();
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        reject(err);
        return;
      }
      if (web3.eth.defaultAccount !== accounts[0]){
        web3.eth.defaultAccount = accounts[0];
      }
      resolve(web3.eth.defaultAccount);
    });
  });
}

export async function getDefaultAccount() {
  return updateDefaultAccount();
}

export async function isConnected() {
  const web3 = await getWeb3();
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error(err);
        reject(false)
        return;
      }
      resolve(accounts.length > 0)
      return;
    });
  });
}

export async function isExpectedNetwork() {
  const web3 = await getWeb3();
  return new Promise((resolve, reject) => {
    let netId = web3.version.network;
    let networkType = determinNetwork(netId);
    // console.log('networkType: ' + networkType);
    resolve(networkType === GlobalJson.networkType ? true : false);
  });
}

function determinNetwork(netId: string) {
  switch (netId) {
    case "1":
      return 'main';
    case "3":
      return 'ropsten';
    default:
      return 'unsupported';
  }
}

export async function bigNumberToEther(value) {
  let valueInWei = value.toNumber();
  let web3 = await getWeb3();
  return Number(web3.fromWei(valueInWei, 'ether'));
}
