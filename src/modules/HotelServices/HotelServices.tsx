import EmptyTable from "@/common/components/EmptyTable";
import hotelIcon from "@/images/hotel-services.svg";
import { useHotel } from "@/common/hook/useHotel";
import plusIcon from "@/images/plus-icon.svg";
import HotelPreview from "./components/HotelPreview";
import RoomServicesList from "./components/RoomServicesList";
import { useRouter } from "next/router";

const HotelServices = () => {
  const { id: hotelId, roomServices } = useHotel();
  const router = useRouter();

  return (
    <div className='row'>
      {!hotelId ? (
        <>
          <div className='mb-11 d-flex'>
            <h1>Услуги</h1>
            <h1 className='text-secondary ms-8'>Номера</h1>
          </div>
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
            <div className='mb-11 d-flex'>
              <h1>Услуги</h1>
              <h1 className='text-secondary ms-8'>Номера</h1>
            </div>
            {Array.isArray(roomServices) && roomServices.length > 0 ? (
              <RoomServicesList />
            ) : (
              <EmptyTable
                icon={hotelIcon}
                title='Услуг пока нет'
                description='Гости не смогут ими воспользоваться, давайте добавим первую'
                onClick={() => router.push(`/druffler/hotels/add?hotelId=${hotelId}`)}
                btnChildren={
                  <>
                    <img src={plusIcon.src} alt='' />
                    <span className='ms-5'>Добавить</span>
                  </>
                }
              />
            )}
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
