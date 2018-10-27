import { combineReducers } from 'redux'
import {  DmmContractActionType  } from './DmmContractActions'
import { DmmContractStatus} from  '../Middleware/Dmm/DmmContractStatus'
import * as Dmm from '../Middleware/Dmm/Dmm'

const initialAccountState = {
  defaultAccount: '',
}

const initialNetworkState = {
  isConnected: false,
  isExpectedNetwork: false,
}



function accounts(state = initialAccountState, action) {
  switch (action.type) {
    case DmmContractActionType.UpdateDefaultAccount:
      state = {...state, defaultAccount: action.payload};
      console.log('update defaultAccount: ' + state.defaultAccount);
      return state
    default:
      return state
  }
}

function networkState(state = initialNetworkState, action) {
  switch (action.type) {
    case DmmContractActionType.UpdateConnectionState:
      state = {...state, isConnected:  action.payload};
      console.log('update isConnected: ' + state.isConnected);
      return state
    case DmmContractActionType.UpdateNetwork:
      state = {...state, isExpectedNetwork: action.payload};
      console.log('update isExpectedNetwork: ' + state.isExpectedNetwork);
      return state
    default:
      return state
  }
}

function actions (state, action) {
  let payload = action.payload;
  switch (action.type) {
    case DmmContractActionType.BuyBadge:
      Dmm.buy(payload.id, payload.refAddress, payload.price);
      return state
    default:
      return null
  }
}

const DmmContractReducer = combineReducers({
  accounts,
  networkState,
  actions,
})

export default DmmContractReducer
