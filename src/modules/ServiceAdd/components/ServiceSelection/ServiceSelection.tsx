import { Dispatch, FC, SetStateAction } from "react";
import { RoomServicesTypes, RoomServiceMenuItemResponse } from "@/types/SwaggerTypes";
import TabServiceWithMenu from "../TabServiceWithMenu";
import TabChangeRoom from "../TabChangeRoom/TabChangeRoom";
import TabOtherService from "../TabOtherService/TabOtherService";

type Props = {
  type: RoomServicesTypes | undefined;
  setAllData: Dispatch<SetStateAction<RoomServiceMenuItemResponse[]>>;
};

const ServiceSelection: FC<Props> = ({ type, setAllData }) => {
  if (type === RoomServicesTypes["ORDER_FOOD"])
    return <TabServiceWithMenu setAllData={setAllData} type={type} />;
  if (type === RoomServicesTypes["LAUNDRY"])
    return <TabServiceWithMenu setAllData={setAllData} type={type} />;
  if (type === RoomServicesTypes["SPA"])
    return <TabServiceWithMenu setAllData={setAllData} type={type} />;
  if (type === RoomServicesTypes["UPGRADE_ROOM"]) return <TabChangeRoom />;
  if (type === RoomServicesTypes["OTHER"]) return <TabOtherService />;
  return <></>;
};

export default ServiceSelection;
