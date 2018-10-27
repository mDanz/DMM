import { combineReducers } from 'redux'
import {  SplitterContractActionType  } from './SplitterContractActions'
import * as Splitter from '../Middleware/Dmm/Splitter'

const initialSplitHistoryState = {
  splitHistory: [],
}



function splitHistory(state = initialSplitHistoryState, action) {
  switch (action.type) {
    case SplitterContractActionType.UpdateSplitHistory:
      state = {...state, splitHistory: action.payload};
      console.log('update splitHistory: ' + state.splitHistory);
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

const SplitterContractReducer = combineReducers({
  splitHistory,
  actions,
})

export default SplitterContractReducer
