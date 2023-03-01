import { HotelAccommodationsUpdateRequest } from "@/common/types/SwaggerTypes";
import { nextApiConnection } from "../http";

export const hotelsAccommodationsService = {
  get: async (hotelId: string) => {
    return nextApiConnection.get(`/hotels/${hotelId}/accommodations`);
  },
  create: async (body: HotelAccommodationsUpdateRequest, hotelId: string) => {
    return nextApiConnection.post(`/hotels/${hotelId}/accommodations`, body);
  },
  edit: async (body: HotelAccommodationsUpdateRequest, hotelId: string) => {
    return nextApiConnection.put(`/hotels/${hotelId}/accommodations`, body);
  },
};
