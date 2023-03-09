import { useState } from "react";
import MobileViewLayout from "@/common/layouts/MobileViewLayout";
import Link from "next/link";
import AddService from "./components/AddService";
import MobileView from "./components/MobileView";
import { RoomServicesTypes, RoomServiceMenuItemResponse } from "@/types/SwaggerTypes";

const ServiceAdd = () => {
  const [allData, setAllData] = useState<RoomServiceMenuItemResponse[]>([]);
  const [activeType, setActiveType] = useState<RoomServicesTypes | undefined>(undefined);

  return (
    <MobileViewLayout
      mobileFrame={<MobileView type={activeType} allData={allData} />}
      headers={
        <Link href='/' className='text-secondary'>
          Сохранить и закрыть
        </Link>
      }
    >
      <AddService activeType={activeType} setActiveType={setActiveType} setAllData={setAllData} />
    </MobileViewLayout>
  );
};

export default ServiceAdd;
