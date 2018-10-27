import { combineReducers } from 'redux'
import {  PCContractActionType  } from './PCContractActions'
import * as PowerChanger from '../Middleware/Dmm/PowerChanger'

const initialPCState = {
  allPC: [],
  pcIndex: 0,
  pcCount: 0,
  isPC: false,
  requirement: 0,
}



function powerChangers(state = initialPCState, action) {
  switch (action.type) {
    case PCContractActionType.UpdateAllPC:
      state = {...state, allPC: action.payload};
      console.log('update allPC: ' + state.allPC);
      return state
    case PCContractActionType.UpdateIsPC:
      state = {...state, isPC: action.payload};
      console.log('update isPC: ' + state.isPC);
      return state
    case PCContractActionType.UpdatePCCount:
    case PCContractActionType.UpdatePCIndex:
    case PCContractActionType.UpdateRequirement:
    default:
      return state
  }
}

function actions (state, action) {
  let payload = action.payload;
  switch (action.type) {
    case PCContractActionType.RemovePC:
      PowerChanger.removePC(payload);
      return state
    case PCContractActionType.AddPC:
    case PCContractActionType.SetRequirement:
    default:
      return null
  }
}

const PCContractReducer = combineReducers({
  powerChangers,
  actions,
})

export default PCContractReducer
