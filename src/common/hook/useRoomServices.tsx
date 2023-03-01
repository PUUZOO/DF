import useSWR from "swr";
import { RoomServicesTypes } from "@/common/types/SwaggerTypes";

export const useRoomServices = (roomServiceId: string | null = null) => {
  const { data: types } = useSWR<RoomServicesTypes[]>(`/api/room/services/types`);

  return {
    types,
  };
};
