import * as Web3Wrapper from '../Web3Wrapper'
import PropTypes from 'prop-types'

import ControllerAbi from '../../../../build/contracts/Controller.json'
import GlobalJson from '../../../Global.json'


const contractAddress = GlobalJson.controllerContractAddress;
const contractAbi = ControllerAbi;

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

export async function isApproved(id: number): Promise<bool> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.isApproved(id, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for approval question.');
        return;
      }
      resolve(result);
    });
  })
}
