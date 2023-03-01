import { HotelContactsUpdateRequest } from "@/common/types/SwaggerTypes";
import { nextApiConnection } from "../http";

export const contactsService = {
  create: async (hotelId: string, body: HotelContactsUpdateRequest) => {
    return nextApiConnection.post(`/hotels/${hotelId}/contacts`, body);
  },
  update: async (hotelId: string, body: HotelContactsUpdateRequest) => {
    return nextApiConnection.put(`/hotels/${hotelId}/contacts`, body);
  },
};
