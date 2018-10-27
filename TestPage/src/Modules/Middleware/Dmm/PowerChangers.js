import * as Web3Wrapper from '../Web3Wrapper'
import PropTypes from 'prop-types'

import PowerChangersAbi from '../../../../build/contracts/PowerChangers.json'
import GlobalJson from '../../../Global.json'


const contractAddress = GlobalJson.powerChangersContractAddress;
const contractAbi = PowerChangersAbi;

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

export async function getPCCount(): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getPCCount((err, result) => {
      if (err) {
        console.error(err);
        reject(-1);
        return;
      }
      if (!result) {
        console.error('undefined result for ChangerCount.');
        return;
      }
      resolve(result);
    });
  })
}

export async function getAllPC(): Promise<void> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getAllPC((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for PowerChangers.');
        return;
      }
      resolve(result);
    });
  })
}

export async function getPCIndex(user: string): Promise<void> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getPCIndex(user, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for PowerChanger Index.');
        return;
      }
      resolve(result);
    });
  })
}

export async function getRequirement(): Promise<void> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getRequirement((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for Requirement.');
        return;
      }
      resolve(result);
    });
  })
}

export async function isPowerChanger(user: string): Promise<bool> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.isPowerChanger(user, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for PowerChanger Status question.');
        return;
      }
      resolve(result);
    });
  })
}

export async function addPC(user: string): Promise<void> {
  const instance = await getInstance();
  let web3 = await Web3Wrapper.getWeb3();
  return new Promise((resolve, reject) => {
    instance.addPC(user, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}

export async function removePC(user: string): Promise<void> {
  const instance = await getInstance();
  let web3 = await Web3Wrapper.getWeb3();
  return new Promise((resolve, reject) => {
    instance.removePC(user, (err) => {
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
