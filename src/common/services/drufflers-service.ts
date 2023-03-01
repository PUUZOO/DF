import { DrufflerInfoUpdateRequest } from "@/types/SwaggerTypes";
import { nextApiConnection } from "../http";

export const drufflersService = {
  // create: async (body: AdminUpdateRequest, accountId: string) => {
  //   return nextApiConnection.post(`/accounts/${accountId}/admins`, body);
  // },

  edit: async (body: DrufflerInfoUpdateRequest, drufflerId: string) => {
    return nextApiConnection.put(`/drufflers/${drufflerId}/info`, body);
  },
  // delete: async (adminId: string) => {
  //   return nextApiConnection.delete(`/admins/${adminId}`);
  // },
};
