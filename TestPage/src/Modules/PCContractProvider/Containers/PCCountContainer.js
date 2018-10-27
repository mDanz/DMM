import React from 'react'
import { connect } from 'react-redux'
import * as PCContractActions from '../PCContractActions'

const mapStateToProps = (state, props) => {
  return {
    pcCount: state.pcCount,
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
  }
}

const ConnectedContainer = connect(mapStateToProps, mapDispatchToProps);

const PCCountContainer = props => {
  const {
    wrappedComponent,
    ...attributes,
  } = props;

  return React.createElement(ConnectedContainer(wrappedComponent), attributes)
}

export default PCCountContainer
