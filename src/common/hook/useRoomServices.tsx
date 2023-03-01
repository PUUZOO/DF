import useSWR from "swr";
import { RoomServicesTypes } from "@/types/SwaggerTypes";
import { useMemo } from "react";
import foodIcon from "@/images/food.svg";
import bedIcon from "@/images/bed.svg";
import ironIcon from "@/images/iron.svg";
import lotusIcon from "@/images/lotus.svg";
import bellIcon from "@/images/bell.svg";

export const useRoomServices = () => {
  const { data: services } = useSWR<RoomServicesTypes[]>("/api/room/services/types");

  const serviceItemInfo = useMemo(
    () => ({
      [RoomServicesTypes.ORDER_FOOD]: { title: "Заказ еды", imgSrc: foodIcon.src },
      [RoomServicesTypes.UPGRADE_ROOM]: { title: "Смена номера", imgSrc: bedIcon.src },
      [RoomServicesTypes.LAUNDRY]: { title: "Прачечная", imgSrc: ironIcon.src },
      [RoomServicesTypes.SPA]: { title: "СПА", imgSrc: lotusIcon.src },
      [RoomServicesTypes.OTHER]: { title: "Другая услуга", imgSrc: bellIcon.src },
    }),
    [],
  );

  return {
    services,
    serviceItemInfo,
  };
};
