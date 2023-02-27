import { AdminInfoUpdateRequest, AdminUpdateRequest } from "../fetchClient";
import { nextApiConnection } from "../http";

export const adminsService = {
  create: async (body: AdminUpdateRequest, accountId: string) => {
    return nextApiConnection.post(`/accounts/${accountId}/admins`, body);
  },
  edit: async (body: AdminInfoUpdateRequest, adminId: string) => {
    return nextApiConnection.put(`/admins/${adminId}/info`, body);
  },
  delete: async (adminId: string) => {
    return nextApiConnection.delete(`/admins/${adminId}`);
  },
};
