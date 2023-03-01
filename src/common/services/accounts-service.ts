import { AccountResponse, HotelUpdateRequest, HotelResponse } from "@/common/types/SwaggerTypes";
import { nextApiConnection } from "../http";

export const accountsService = {
  create: async (body: AccountResponse) => {
    return nextApiConnection.post(`/accounts`, body);
  },
  edit: async (body: AccountResponse, account_id: string) => {
    return nextApiConnection.put(`/accounts/${account_id}`, body);
  },
  delete: async (account_id: string) => {
    return nextApiConnection.delete(`/accounts/${account_id}`);
  },
  getHotels: async (account_id: string) => {
    return nextApiConnection.get(`/accounts/${account_id}/hotels`);
  },
  createHotel: async (account_id: string, body: HotelUpdateRequest) => {
    return nextApiConnection.post<HotelResponse>(`/accounts/${account_id}/hotels`, body);
  },
};
