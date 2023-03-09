import useSWR from "swr";
import { RoomServicesTypes, RoomServiceCreateRequest } from "@/types/SwaggerTypes";
import { useMemo } from "react";
import foodIcon from "@/images/food.svg";
import bedIcon from "@/images/bed.svg";
import ironIcon from "@/images/iron.svg";
import lotusIcon from "@/images/lotus.svg";
import bellIcon from "@/images/bell.svg";
import { roomServicesService } from "../services/room-services-service";

export const useRoomServices = () => {
  const { data: services } = useSWR<RoomServicesTypes[]>("/api/room/services/types");

  const serviceItemInfo = useMemo(
    () => ({
      [RoomServicesTypes.ORDER_FOOD]: { title: "Заказ еды", imgSrc: foodIcon.src },
      [RoomServicesTypes.LAUNDRY]: { title: "Прачечная", imgSrc: ironIcon.src },
      [RoomServicesTypes.SPA]: { title: "СПА", imgSrc: lotusIcon.src },
      [RoomServicesTypes.OTHER]: { title: "Другая услуга", imgSrc: bellIcon.src },
      [RoomServicesTypes.UPGRADE_ROOM]: { title: "Смена номера", imgSrc: bedIcon.src },
    }),
    [],
  );
  const createService = async (body: RoomServiceCreateRequest) =>
    await roomServicesService.create(body);
  const deleteService = async (roomServiceId: string) =>
    await roomServicesService.delete(roomServiceId);
  const uploadMenu = (roomServiceId: string, menu: FormData) =>
    roomServicesService.uploadMenu(roomServiceId, menu);
  const getMenuItems = (roomServiceId: string, menuId: string) =>
    roomServicesService.getMenuItems(roomServiceId, menuId);

  return {
    services,
    serviceItemInfo,
    createService,
    deleteService,
    uploadMenu,
    getMenuItems,
  };
};
