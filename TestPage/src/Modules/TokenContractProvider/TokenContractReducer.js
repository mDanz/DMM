import { combineReducers } from 'redux'
import {  TokenContractActionType  } from './TokenContractActions'
import * as Token from '../Middleware/Dmm/Token'

const initialTokenState = {
  percentage: 0,
}



function tokens(state = initialTokenState, action) {
  switch (action.type) {
    case TokenContractActionType.UpdatePercentage:
      state = {...state, percentage: action.payload};
      console.log('update percentage: ' + state.percentage);
      return state
    default:
      return state
  }
}

function actions (state, action) {
  let payload = action.payload;
  switch (action.type) {
    default:
      return null
  }
}

const TokenContractReducer = combineReducers({
  tokens,
  actions,
})

export default TokenContractReducer
