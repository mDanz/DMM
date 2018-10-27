import * as Web3Wrapper from '../Web3Wrapper'
import PropTypes from 'prop-types'

import SplitterAbi from '../../../../build/contracts/Splitter.json'
import GlobalJson from '../../../Global.json'


const contractAddress = GlobalJson.splitterContractAddress;
const contractAbi = SplitterAbi;

export async function getInstance() {
  let web3 = await Web3Wrapper.getWeb3();
  if (!web3) {
    console.error(GlobalJson.noMetamaskErrorMsg);
    return false;
  }

  let contract = web3.eth.contract(contractAbi.abi);
  const instance = contract.at(contractAddress);
  return instance;
}

export async function getSplitHistory(user: string): Promise<void> {
  const instance = await getInstance();
  Web3Wrapper.getDefaultAccount()
    .then( (defaultAccount) => {
      return new Promise((resolve, reject) => {
        let splitEvent = instance.onSplit({_from: defaultAccount}, {fromBlock: 0, toBlock: 'latest'})
        splitEvent.get((err, result) => {
          if (err) {
            reject(err);
            return;
          }
          if (!result) {
            console.error('undefined result for split log.');
            return;
          }
          resolve(result);
        });
      })
  });
}
