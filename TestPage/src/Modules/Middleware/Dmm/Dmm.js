import * as Web3Wrapper from '../Web3Wrapper'
import PropTypes from 'prop-types'
import { DmmContractStatus } from './DmmContractStatus'

import DmmAbi from '../../../../build/contracts/Dmm.json'
import GlobalJson from '../../../Global.json'


const contractAddress = GlobalJson.smartContractAddress;
const contractAbi = DmmAbi;

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

export const BadgeType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  totalDivis: PropTypes.number.isRequired,
})


export async function getBadges(): Promis<void> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getBadges((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for badges.');
        return;
      }
      let badges = convertResultToBadges(result);
      // console.log("resolved " + badges.length + " Badges");
      resolve(badges);
    });
  })
}

export async function getBadgesRange(fromBadge: number, toBadge: number): Promis<void> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getBadges(fromBadge, toBadge, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for badges.');
        return;
      }
      let badges = convertResultToBadges(result);
      // console.log("resolved " + badges.length + " Badges");
      resolve(badges);
    });
  })
}

async function convertResultToBadges (result) {
  //let t0 = performance.now();
  let numBadges = result[0].length;
  let badges = new Array(numBadges);
  for (let i = 0; i < numBadges; i++) {
    let currentOwner = result[0][i];
    let currentPrice = await Web3Wrapper.bigNumberToEther(result[1][i]);
    let currentTotalDivis = await Web3Wrapper.bigNumberToEther(result[2][i]);
    badges[i] = {
                  id: i,
                  owner: currentOwner,
                  price: currentPrice,
                  totalDivis: currentTotalDivis,
                };
  }
  //let t1 = performance.now();
  //console.log("Leave: Convert to Badges took: " + (t1 - t0) + "ms");
  return badges;
}

export async function getStartTime(): Promise<string> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getStartTime((err, result) => {
      if (err) {
        console.error(err);
        reject(-1);
        return;
      }
      if (!result) {
        console.error('undefined result for start time.');
        return;
      }
      resolve(result.c[0]);
    });
  })
}


export async function getContractStatus(): Promise<string> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getStartTime((err, result) => {
      if (err) {
        console.error(err);
        reject(DmmContractStatus.Unknown);
        return;
      }
      if (!result) {
        console.error('undefined result for contract status.');
        return;
      }
      let startTimeStamp = result.c[0];
      let nowTimeStamp = Math.floor(Date.now() / 1000);
      let status = (startTimeStamp === 0)
                  ? DmmContractStatus.Unknown
                  : (startTimeStamp > nowTimeStamp)
                    ? DmmContractStatus.Initial
                    : DmmContractStatus.Running;
      resolve(status);
    });
  })
}


export async function getBalanceContract(): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getBalanceContract((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for contract balance.');
        return;
      }
      let balanceInEth = Web3Wrapper.bigNumberToEther(result);
      resolve(balanceInEth);
    });
  })
}

export async function getSplitProfit(user: string): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getSplitProfit(user, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for split profit.');
        return;
      }
      let splitProfitInEth = Web3Wrapper.bigNumberToEther(result);
      resolve(splitProfitInEth);
    });
  })
}



export async function getWaypointProfit(user: string): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getWaypointProfit(user, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for waypoint profits.');
        return;
      }
      let waypointProfitInEth = Web3Wrapper.bigNumberToEther(result);
      resolve(waypointProfitInEth);
    });
  })
}


export async function getFlipProfit(user: string): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getFlipProfit(user, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for flip profits.');
        return;
      }
      let flipProfitInEth = Web3Wrapper.bigNumberToEther(result);
      resolve(flipProfitInEth);
    });
  })
}

export async function getReferer(user: string): Promise<number> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.getReferer(user, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result) {
        console.error('undefined result for referer.');
        return;
      }
      resolve(result);
    });
  })
}


export async function withdrawDivis(): Promise<void> {
  const instance = await getInstance();
  return new Promise((resolve, reject) => {
    instance.withdrawDivis((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}

export async function buy(badgeID: number, newReferer: string, price: number): Promise<void> {
  const instance = await getInstance();
  let web3 = await Web3Wrapper.getWeb3();
  const weiPrice = web3.toWei(price, "ether");
  // console.log('weiPrice ' + weiPrice);
  return new Promise((resolve, reject) => {
    instance.buy(badgeID, newReferer, {value: weiPrice}, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  })
}

////// Event Handler /////

export const ContractStartEvent = 'onContractStart';
export const RefererSetEvent = 'onRefererSet';
export const WithdrawEvent = 'onWithdraw';
export const BadgeBuyEvent = 'onBadgeBuy';


export async function setOnContractStart(callback: any => void) {
  const instance = await getInstance();
  instance.onContractStart().watch((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    //console.log(result);
    callback(result.event);
  });
}


export async function setOnRefererSet(callback: any => void) {
  const instance = await getInstance();
  instance.onRefererSet().watch((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    //console.log(result);
    callback( result.event, result.args.user_, result.args.referer);
  });
}


export async function setOnWithdraw(callback: any => void) {
  const instance = await getInstance();
  Web3Wrapper.getDefaultAccount()
    .then( (defaultAccount) => {
      instance.onWithdraw().watch((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        // console.log(result);
        callback( result.event,
                  result.args.receiver_,
                  Web3Wrapper.bigNumberToEther(result.args.amount_),
                  defaultAccount
                );
      });
  });
}

export async function setOnBadgeBuy(callback: any => void) {
  const instance = await getInstance();
  Web3Wrapper.getDefaultAccount()
    .then((defaultAccount) => {
      instance.onBadgeBuy().watch((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        //console.log(result);
        callback( result.event,
                  result.args.badgeID_,
                  result.args.buyer_,
                  Web3Wrapper.bigNumberToEther(result.args.price_),
                  Web3Wrapper.bigNumberToEther(result.args.newPrice_),
                  defaultAccount);
      });
  });
}
