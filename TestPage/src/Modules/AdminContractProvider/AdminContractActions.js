
export const AdminContractActionType = {
  UpdateIsAdmin     : 'UpdateIsAdmin',
}

export function updateIsAdmin(isAdmin) {
  return {
    type: AdminContractActionType.UpdateIsAdmin,
    payload: isAdmin,
  };
}
