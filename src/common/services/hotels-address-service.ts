import { HotelAddressUpdateRequest } from "@/common/types/SwaggerTypes";
import { nextApiConnection } from "../http";

export const hotelsAddressService = {
  get: async (hotelId: string) => {
    return nextApiConnection.get(`/hotels/${hotelId}/address`);
  },
  create: async (hotelId: string, body: HotelAddressUpdateRequest) => {
    return nextApiConnection.post(`/hotels/${hotelId}/address`, body);
  },
  edit: async (body: HotelAddressUpdateRequest, hotelId: string) => {
    return nextApiConnection.put(`/hotels/${hotelId}/address`, body);
  },
};
