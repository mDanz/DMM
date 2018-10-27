import React from 'react';
import DmmContractAccountContainer from './Containers/DmmContractAccountContainer'
import DmmContractNetworkStateContainer from './Containers/DmmContractNetworkStateContainer'

function canAccessContractData(WrappedComponent, Container) {
  const Wrapper = (props) => (
    <Container
      wrappedComponent={WrappedComponent}
      {...props}
    />
  );

  return Wrapper;
}

export function canAccessAccounts(WrappedComponent) {
  return canAccessContractData(WrappedComponent, DmmContractAccountContainer);
}

export function canAccessNetworkState(WrappedComponent) {
  return canAccessContractData(WrappedComponent, DmmContractNetworkStateContainer);
}
