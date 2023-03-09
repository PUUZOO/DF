import { FC } from "react";
import Image from "next/image";
import Button from "@/common/ui/Button";
import { useRouter } from "next/router";
import { useHotel } from "@/common/hook/useHotel";
import { useRoomServices } from "@/common/hook/useRoomServices";
import EmptyTable from "@/common/components/EmptyTable";
import hotelIcon from "@/images/hotel-services.svg";
import plusIcon from "@/images/plus-icon.svg";
import RoomService from "./RoomService";

const servicesNames = {
  order_food: "Заказ еды",
  upgrade_room: "Смена номера",
  laundry: "Прачечная",
  spa: "SPA",
};

const RoomServicesList: FC = () => {
  const { id: hotelId, roomServices } = useHotel();
  const router = useRouter();

  if (!roomServices) {
    return <>no services</>;
  }

  const activeRoomServices = roomServices.filter(
    ({ is_active, is_deleted }) => is_active && !is_deleted,
  );
  const notActiveRoomServices = roomServices.filter(
    ({ is_active, is_deleted }) => !is_active && !is_deleted,
  );

  if (roomServices && roomServices.length === 0)
    return (
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
    );

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Button
            className='btn btn-light w-100'
            onClick={() => router.push(`/druffler/hotels/add?hotelId=${hotelId}`)}
          >
            <Image src={"/svg/plus.svg"} width={24} height={24} alt='' />
            <span className='ms-5 fs-4'>Добавить услугу</span>
          </Button>
        </div>
      </div>

      {/* active services */}
      {activeRoomServices.length > 0 && (
        <>
          <div className='row mt-11 mb-7'>
            <div className='col'>
              <span className='text-secondary'>Активные</span>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              {activeRoomServices.map((service) => (
                <RoomService service={service} key={service.id} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* not active services */}
      {notActiveRoomServices.length > 0 && (
        <>
          <div className='row mt-11 mb-7'>
            <div className='col'>
              <span className='text-secondary'>Скрыты от гостей</span>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              {notActiveRoomServices.map((service) => (
                <RoomService service={service} key={service.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomServicesList;
