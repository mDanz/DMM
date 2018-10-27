
export const DmmContractActionType = {
  UpdateDefaultAccount    : 'UpdateDefaultAccount',
  UpdateConnectionState   : 'UpdateConnectionState',
  UpdateNetwork           : 'UpdateNetwork',
}

export function updateDefaultAccount(defaultAccount: string) {
  return {
    type: DmmContractActionType.UpdateDefaultAccount,
    payload: defaultAccount,
  };
}

export function updateConnectionState(isConnected: bool) {
  return {
    type: DmmContractActionType.UpdateConnectionState,
    payload: isConnected,
  };
}

export function updateNetwork(isExpectedNetwork: bool) {
  return {
    type: DmmContractActionType.UpdateNetwork,
    payload: isExpectedNetwork,
  };
}
