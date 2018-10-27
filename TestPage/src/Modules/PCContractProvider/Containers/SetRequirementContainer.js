import React from 'react'
import { connect } from 'react-redux'
import * as PCContractActions from '../PCContractActions'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSetRequirement: () => {
      dispatch(PCContractActions.setRequirement())
    },
  }
}

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps);

const SetRequirementContainer = props => {
  const {
    wrappedComponent,
    ...attributes,
  } = props;

  return React.createElement(ConnectedContainer(wrappedComponent), attributes)
}

export default SetRequirementContainer
