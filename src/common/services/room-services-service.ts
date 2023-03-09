import {
  RoomServiceCreateRequest,
  RoomServiceResponse,
  RoomServiceUpdateRequest,
  RoomServiceMenuUpdateRequest,
  RoomServiceMenuItemResponse,
  RoomServiceMenuResponse,
} from "@/common/types/SwaggerTypes";
import { AxiosResponse } from "axios";
import { nextApiConnection } from "../http";
import { RoomServiceMenuItemUpdateRequest } from "../types/SwaggerTypes/models/RoomServiceMenuItemUpdateRequest";

const endPoint = `/room/services`;

export const roomServicesService = {
  create: async (body: RoomServiceCreateRequest) => {
    return nextApiConnection.post<RoomServiceResponse>(endPoint, body);
  },
  update: async (body: RoomServiceUpdateRequest, roomServiceId: string) => {
    return nextApiConnection.put(`${endPoint}/${roomServiceId}`, body);
  },
  delete: async (roomServiceId: string) => {
    return nextApiConnection.delete(`${endPoint}/${roomServiceId}`);
  },
  uploadMenu: async (roomServiceId: string, file: FormData) => {
    return nextApiConnection.post<RoomServiceMenuResponse>(
      `${endPoint}/${roomServiceId}/menu`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  getMenuItems: async (roomServiceId: string, menuId: string) => {
    return nextApiConnection.get<RoomServiceMenuItemResponse[]>(
      `${endPoint}/${roomServiceId}/menu/${menuId}/items`,
    );
  },
  updateMenuItem: async (
    body: RoomServiceMenuItemUpdateRequest,
    roomServiceId: string,
    menuId: string,
    itemId: string,
  ) => {
    return nextApiConnection.put(
      `${endPoint}/${roomServiceId}/menu/${menuId}/items/${itemId}`,
      body,
    );
  },
};
