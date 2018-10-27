
export const PCContractActionType = {
  UpdatePCCount     : 'UpdatePCCount',
  UpdateAllPC       : 'UpdateAllPC',
  UpdatePCIndex     : 'UpdatePCIndex',
  UpdateIsPC        : 'UpdateIsPC',
  UpdateRequirement : 'UpdateRequirement',
  RemovePC          : 'RemovePC',
  AddPC             : 'AddPC',
  SetRequirement    : 'SetRequirement',
}

export function updatePCCount(count: number) {
  return {
    type: PCContractActionType.UpdatePCCount,
    payload: defaultAccount,
  };
}

export function updateAllPC(powerChangers) {
  return {
    type: PCContractActionType.UpdateAllPC,
    payload: powerChangers,
  };
}

export function updatePCIndex(index: number) {
  return {
    type: PCContractActionType.UpdatePCIndex,
    payload: index,
  };
}

export function updateIsPC(isPC: bool) {
  return {
    type: PCContractActionType.UpdateIsPC,
    payload: isPC,
  };
}

export function addPC(user: string) {
  return {
    type: PCContractActionType.UpdateAddPC,
    payload: user,
  };
}

export function removePC(user: string) {
  return {
    type: PCContractActionType.RemovePC,
    payload: user,
  };
}

export function updateRequirement(percent: number) {
  return {
    type: PCContractActionType.UpdateRequirement,
    payload: percent,
  };
}

export function setRequirement(percent: number) {
  return {
    type: PCContractActionType.SetRequirement,
    payload: percent,
  };
}
