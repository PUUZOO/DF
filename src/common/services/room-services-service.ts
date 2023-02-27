import { RoomServiceCreateRequest, RoomServiceUpdateRequest } from "../fetchClient";
import { nextApiConnection } from "../http";

const endPoint = `/room/services`;

export const roomServicesService = {
  create: async (body: RoomServiceCreateRequest) => {
    return nextApiConnection.post(endPoint, body);
  },
  update: async (body: RoomServiceUpdateRequest, roomServiceId: string) => {
    return nextApiConnection.put(`${endPoint}/${roomServiceId}`, body);
  },
  delete: async (roomServiceId: string) => {
    return nextApiConnection.delete(`${endPoint}/${roomServiceId}`);
  },
};
