import React from 'react';
import PercentageContainer from './Containers/PercentageContainer'

function canAccessContractData(WrappedComponent, Container) {
  const Wrapper = (props) => (
    <Container
      wrappedComponent={WrappedComponent}
      {...props}
    />
  );

  return Wrapper;
}

export function canAccessPercentage(WrappedComponent) {
  return canAccessContractData(WrappedComponent, PercentageContainer);
}
