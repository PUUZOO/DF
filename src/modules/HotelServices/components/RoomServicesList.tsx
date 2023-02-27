import { FC } from "react";
import { useHotel } from "@/common/hook/useHotel";
import Image from "next/image";
import styled from "styled-components";
import Button from "@/common/ui/Button";
import Switch from "@/common/ui/Switch/Switch";
import { roomServicesService } from "@/common/services/room-services-service";

const servicesNames = {
  order_food: "Заказ еды",
  upgrade_room: "Смена номера",
  laundry: "Прачечная",
  spa: "SPA",
};

const RoomServicesList: FC = () => {
  const { roomServices, mutateRoomServices } = useHotel();

  if (!roomServices) {
    return <>no services</>;
  }

  const activeRoomServices = roomServices.filter(({ is_active }) => is_active);
  const notActiveRoomServices = roomServices.filter(({ is_active }) => !is_active);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Button className='btn btn-light w-100'>
            <Image src={"/svg/plus.svg"} width={24} height={24} alt='' />
            <span className='fs-4'>Добавить услугу</span>
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
              {activeRoomServices.map(({ service_type, custom_name, id, is_active }) => (
                <RoomServiceStyled
                  key={id}
                  className='row justify-content-between align-items-center py-8'
                >
                  <div className='col d-flex flex-row'>
                    <div className='col-2'>
                      <Switch
                        checked={is_active}
                        onClick={async () => {
                          await roomServicesService.update({ is_active: !is_active }, id);
                          mutateRoomServices();
                        }}
                      />
                    </div>
                    <div className='col'>
                      {service_type === "other" ? custom_name : servicesNames[service_type]}
                    </div>
                  </div>
                  <div className='col-2'>
                    <Image
                      src={"/svg/edit.svg"}
                      width={24}
                      height={24}
                      alt='service edit'
                      onClick={() => console.log("service edit")}
                      style={{ cursor: "pointer" }}
                    />
                    <Image
                      src={"/svg/bin.svg"}
                      width={24}
                      height={24}
                      alt='service delete'
                      onClick={() => console.log("service delete")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </RoomServiceStyled>
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
              {notActiveRoomServices.map(({ service_type, custom_name, id, is_active }) => (
                <RoomServiceStyled
                  key={id}
                  className='row justify-content-between align-items-center py-8'
                >
                  <div className='col d-flex flex-row'>
                    <div className='col-2'>
                      <Switch
                        checked={is_active}
                        onClick={async () => {
                          await roomServicesService.update({ is_active: !is_active }, id);
                          mutateRoomServices();
                        }}
                      />
                    </div>
                    <div className='col'>
                      {service_type === "other" ? custom_name : servicesNames[service_type]}
                    </div>
                  </div>
                  <div className='col-2'>
                    <Image
                      src={"/svg/edit.svg"}
                      width={24}
                      height={24}
                      alt='service edit'
                      onClick={() => console.log("service edit")}
                      style={{ cursor: "pointer" }}
                    />
                    <Image
                      src={"/svg/bin.svg"}
                      width={24}
                      height={24}
                      alt='service delete'
                      onClick={() => console.log("service delete")}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </RoomServiceStyled>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const RoomServiceStyled = styled.div`
  border: 1px solid white;

  /* & + & {
    border-top: 1px solid #e6e8eb;
  } */

  &:hover {
    border: 1px solid #e6e8eb;
    border-radius: 12px;
  }
`;

export default RoomServicesList;
