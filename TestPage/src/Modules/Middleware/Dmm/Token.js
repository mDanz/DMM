import * as Web3Wrapper from '../Web3Wrapper'
import PropTypes from 'prop-types'

import TokenAbi from '../../../../build/contracts/Token.json'
import GlobalJson from '../../../Global.json'


const contractAddress = GlobalJson.tokenContractAddress;
const contractAbi = TokenAbi;

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

export async function getTokens(user: string): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getTokens((err, result) => {
      if (err) {
        console.error(err);
        reject(-1);
        return;
      }
      if (!result) {
        console.error('undefined result for token number.');
        return;
      }
      resolve(result);
    });
  })
}

export async function getPercentage(user: string): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getPercentage((err, result) => {
      if (err) {
        console.error(err);
        reject(-1);
        return;
      }
      if (!result) {
        console.error('undefined result for token percentage.');
        return;
      }
      resolve(result);
    });
  })
}

export async function getTotalAmount(): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getTotalAmount((err, result) => {
      if (err) {
        console.error(err);
        reject(-1);
        return;
      }
      if (!result) {
        console.error('undefined result for total token amount.');
        return;
      }
      resolve(result);
    });
  })
}

export async function getAllUsers(): Promise<void> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getAllUsers((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for users.');
        return;
      }
      resolve(result);
    });
  })
}

export async function setUserTokens(user: string, amount: number): Promise<void> {
  const instance = await getInstance();
  let web3 = await Web3Wrapper.getWeb3();
  return new Promise((resolve, reject) => {
    instance.setUserTokens(user, amount, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}
