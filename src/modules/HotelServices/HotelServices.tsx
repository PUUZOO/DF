import EmptyTable from "@/common/components/EmptyTable";
import hotelIcon from "@/images/hotel-services.svg";
import { useHotel } from "@/common/hook/useHotel";

import HotelPreview from "./components/HotelPreview";
import RoomServicesList from "./components/RoomServicesList";
import { useRouter } from "next/router";
import { useState } from "react";

const HotelServices = () => {
  const { id: hotelId, roomServices } = useHotel();
  const router = useRouter();
  const [type, setType] = useState<"services" | "rooms">("services");

  return (
    <div className='row'>
      <div className='mb-11 d-flex'>
        <h1
          className={`${type === "rooms" ? "text-secondary" : ""} me-8 cursor-pointer`}
          onClick={() => setType("services")}
        >
          Услуги
        </h1>
        <h1
          className={`${type === "services" ? "text-secondary" : ""} cursor-pointer`}
          onClick={() => setType("rooms")}
        >
          Номера
        </h1>
      </div>
      {!hotelId ? (
        <>
          <EmptyTable
            icon={hotelIcon}
            title='Не выбран отель'
            description='Пожалуйста выберите отель.'
            onClick={() => console.log("test")}
          />
        </>
      ) : (
        <>
          <div className='col-lg-7 col-xl-8'>
            {type === "services" && <RoomServicesList />}
            {type === "rooms" && <div>test</div>}
          </div>

          <div className='col-lg-5 col-xl-4 pt-11 pt-lg-0'>
            <HotelPreview />
          </div>
        </>
      )}
    </div>
  );
};

export default HotelServices;
