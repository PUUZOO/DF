import { FC } from "react";
import { RoomServicesTypes } from "@/common/types/SwaggerTypes";
import TabOrderFood from "../TabOrderFood";

type Props = {
  type: RoomServicesTypes;
};

const ServiceSelection: FC<Props> = ({ type }) => {
  if (type === RoomServicesTypes["ORDER_FOOD"]) return <TabOrderFood />;

  return <></>;
};

export default ServiceSelection;
