import * as Web3Wrapper from '../Web3Wrapper'
import PropTypes from 'prop-types'

import AdminAbi from '../../../../build/contracts/Admin.json'
import GlobalJson from '../../../Global.json'


const contractAddress = GlobalJson.adminContractAddress;
const contractAbi = AdminAbi;

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

export async function isAdmin(user: string): Promise<bool> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.isAdmin(user, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for is admin question.');
        return;
      }
      resolve(result);
    });
  })
}

export async function getRequirement(): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getRequirement((err, result) => {
      if (err) {
        console.error(err);
        reject(-1);
        return;
      }
      if (!result) {
        console.error('undefined result for requirement percentage.');
        return;
      }
      resolve(result);
    });
  })
}

export async function addChanger(user: string): Promise<void> {
  const instance = await getInstance();
  let web3 = await Web3Wrapper.getWeb3();
  return new Promise((resolve, reject) => {
    instance.addChanger(user, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}

export async function revokeChanger(user: string): Promise<void> {
  const instance = await getInstance();
  let web3 = await Web3Wrapper.getWeb3();
  return new Promise((resolve, reject) => {
    instance.revokeChanger(user, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}

export async function setRequirement(percent: number): Promise<void> {
  const instance = await getInstance();
  let web3 = await Web3Wrapper.getWeb3();
  return new Promise((resolve, reject) => {
    instance.setRequirement(percent, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}
