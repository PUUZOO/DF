import { nextApiConnection } from "../http";

export const messengersService = {
  create: async (hotelId: string, body: { telegram: boolean; whatsup: boolean }) => {
    return nextApiConnection.post(`/hotels/${hotelId}/messengers`, body);
  },
  update: async (hotelId: string, body: { telegram: boolean; whatsup: boolean }) => {
    return nextApiConnection.put(`/hotels/${hotelId}/messengers`, body);
  },
};
