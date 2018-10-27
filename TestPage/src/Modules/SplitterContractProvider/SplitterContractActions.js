
export const SplitterContractActionType = {
  UpdateSplitHistory     : 'UpdateSplitHistory',
}

export function updateSplitHistory(history) {
  return {
    type: SplitterContractActionType.UpdateSplitHistory,
    payload: history,
  };
}
