import { useState } from "react";
import MobileView from "./components/MobileView";
import StepsForm from "./components/StepsForm";
import MobileViewLayout from "@/common/layouts/MobileViewLayout";
import Link from "next/link";

export type InitialAllDataType = {
  name?: string;
  description?: string;
  country?: string;
  city?: string;
  street?: string;
  building?: string;
  email?: string;
  phone?: string;
};

const initialAllData: InitialAllDataType = {
  name: "",
  description: "",
  country: "",
  city: "",
  street: "",
  building: "",
  email: "",
  phone: "",
};

const HotelAdd = () => {
  const [allData, setAllData] = useState(initialAllData);
  const [hotelIdInside, setHotelIdInside] = useState<string | null>(null);

  return (
    <MobileViewLayout
      mobileFrame={<MobileView hotelIdInside={hotelIdInside} allData={allData} />}
      headers={
        <Link href='/' className='text-secondary'>
          Закрыть
        </Link>
      }
    >
      <StepsForm
        hotelIdInside={hotelIdInside}
        setHotelIdInside={setHotelIdInside}
        setAllData={(newData) => setAllData({ ...allData, ...newData })}
      />
    </MobileViewLayout>
  );
};

export default HotelAdd;
