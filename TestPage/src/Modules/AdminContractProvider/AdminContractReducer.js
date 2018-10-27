import { combineReducers } from 'redux'
import {  AdminContractActionType  } from './AdminContractActions'
import * as Admin from '../Middleware/Dmm/Admin'

const initialAdminState = {
  isAdmin: false,
}



function admin(state = initialAdminState, action) {
  switch (action.type) {
    case AdminContractActionType.UpdateIsAdmin:
      state = {...state, isAdmin: action.payload};
      console.log('update isAdmin: ' + state.isAdmin);
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

const AdminContractReducer = combineReducers({
  admin,
  actions,
})

export default AdminContractReducer
