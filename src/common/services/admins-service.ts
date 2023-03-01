import { ChangePasswordIn, AdminInfoUpdateRequest, AdminUpdateRequest } from "@/types/SwaggerTypes";
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
  changePassword: async (body: ChangePasswordIn, adminId: string) => {
    return nextApiConnection.put(`/admins/${adminId}/pwd`, body);
  },
};
