
export const TokenContractActionType = {
  UpdatePercentage     : 'UpdatePercentage',
}

export function updatePercentage(percent: number) {
  return {
    type: TokenContractActionType.UpdatePercentage,
    payload: percent,
  };
}
