import React from 'react';
import IsPCContainer from './Containers/IsPCContainer'
import AddPCContainer from './Containers/AddPCContainer'
import AllPCContainer from './Containers/AllPCContainer'
import PCCountContainer from './Containers/PCCountContainer'
import PCIndexContainer from './Containers/PCIndexContainer'
import RemovePCContainer from './Containers/RemovePCContainer'
import RequirementContainer from './Containers/RequirementContainer'
import SetRequirementContainer from './Containers/SetRequirementContainer'

function canAccessContractData(WrappedComponent, Container) {
  const Wrapper = (props) => (
    <Container
      wrappedComponent={WrappedComponent}
      {...props}
    />
  );

  return Wrapper;
}

export function canAccessAllPC(WrappedComponent) {
  return canAccessContractData(WrappedComponent, AllPCContainer);
}

export function canAccessPCIndex(WrappedComponent) {
  return canAccessContractData(WrappedComponent, PCIndexContainer);
}

export function canAccessPCCount(WrappedComponent) {
  return canAccessContractData(WrappedComponent, PCCountContainer);
}

export function canAccessIsPC(WrappedComponent) {
  return canAccessContractData(WrappedComponent, IsPCContainer);
}

export function canAccessRemovePC(WrappedComponent) {
  return canAccessContractData(WrappedComponent, RemovePCContainer);
}

export function canAccessAddPC(WrappedComponent) {
  return canAccessContractData(WrappedComponent, AddPCContainer);
}

export function canAccessRequirement(WrappedComponent) {
  return canAccessContractData(WrappedComponent, RequirementContainer);
}

export function canAccessSetRequirement(WrappedComponent) {
  return canAccessContractData(WrappedComponent, SetRequirementContainer);
}
