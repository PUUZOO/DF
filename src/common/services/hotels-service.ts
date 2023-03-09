import {
  HotelUpdateRequest,
  HotelResponse,
} from "@/common/types/SwaggerTypes";
import { nextApiConnection } from "../http";

const endPoint = `/hotels`;

export const hotelsService = {
  get: async (hotelId: string) => {
    return nextApiConnection.get<HotelResponse>(`${endPoint}/${hotelId}`);
  },
  update: async (body: HotelUpdateRequest, hotelId: string) => {
    return nextApiConnection.put<HotelResponse>(`${endPoint}/${hotelId}`, body);
  },
  delete: async (hotelId: string) => {
    return nextApiConnection.delete<HotelResponse>(`${endPoint}/${hotelId}`);
  },
};
