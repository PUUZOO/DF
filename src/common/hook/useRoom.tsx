import useSWR from "swr";
import { RoomServicesTypes } from "@/common/fetchClient";
import { useMemo } from "react";

export const useRoom = () => {
  const { data: services } = useSWR<RoomServicesTypes[]>("/api/room/services/types");

  const serviceItemInfo = useMemo(
    () => ({
      [RoomServicesTypes.ORDER_FOOD]: { title: "Заказ еды", imgSrc: "/svg/food.svg" },
      [RoomServicesTypes.UPGRADE_ROOM]: { title: "Смена номера", imgSrc: "/svg/bed.svg" },
      [RoomServicesTypes.LAUNDRY]: { title: "Прачечная", imgSrc: "/svg/iron.svg" },
      [RoomServicesTypes.SPA]: { title: "СПА", imgSrc: "/svg/lotus.svg" },
      [RoomServicesTypes.OTHER]: { title: "Другая услуга", imgSrc: "/svg/bell.svg" },
    }),
    [],
  );

  return {
    services,
    serviceItemInfo,
  };
};
