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
    onRemovePC: () => {
      dispatch(PCContractActions.removePC())
    },
  }
}

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps);

const RemovePCContainer = props => {
  const {
    wrappedComponent,
    ...attributes,
  } = props;

  return React.createElement(ConnectedContainer(wrappedComponent), attributes)
}

export default RemovePCContainer
