import { HotelAddressUpdateRequest } from "../fetchClient";
import { nextApiConnection } from "../http";

export const hotelsPhotosService = {
  get: async (hotelId: string) => {
    return nextApiConnection.get(`/hotels/${hotelId}/photos`);
  },
  create: async (hotelId: string, file: FormData) => {
    return nextApiConnection.post(`/hotels/${hotelId}/photos`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  edit: async (body: HotelAddressUpdateRequest, hotelId: string, photoId: string) => {
    return nextApiConnection.put(`/hotels/${hotelId}/photos/${photoId}`, body);
  },
  delete: async (hotelId: string, photoId: string) => {
    return nextApiConnection.delete(`/hotels/${hotelId}/photos/${photoId}`);
  },
};
