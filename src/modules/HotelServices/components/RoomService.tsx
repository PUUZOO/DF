import { FC, useState } from "react";
import styled from "styled-components";
import { RoomServiceFullResponse } from "../../../common/types/SwaggerTypes/models/RoomServiceFullResponse";
import Switch from "@/common/ui/Switch";
import { roomServicesService } from "@/common/services/room-services-service";
import { useRoomServices } from "@/common/hook/useRoomServices";
import Image from "next/image";
import { useHotel } from "@/common/hook/useHotel";
import { RoomServiceMenuItemResponse } from "@/common/types/SwaggerTypes";
import Button from "@/common/ui/Button";
import { useRouter } from "next/router";
import Modal from "@/common/ui/Modal";
import MenuTable from "@/common/components/MenuTable";
import { TableType } from "@/modules/ServiceAdd/components/TabServiceWithMenu/TableType";
import EditMenuItemModal from "@/modules/ServiceAdd/components/TabServiceWithMenu/components/EditMenuItemModal";

const servicesNames = {
  order_food: "Заказ еды",
  upgrade_room: "Смена номера",
  laundry: "Прачечная",
  spa: "SPA",
};

type Props = {
  service: RoomServiceFullResponse;
};

const RoomService: FC<Props> = ({ service }) => {
  const { service_type, custom_name, id, is_active } = service;
  const router = useRouter();
  const { deleteService, getMenuItems } = useRoomServices();
  const { mutateRoomServices } = useHotel();
  const [modal, setModal] = useState<{
    show: boolean;
    menuList: RoomServiceMenuItemResponse[];
    menuId: string;
  }>({
    show: false,
    menuList: [],
    menuId: "",
  });

  const [modalEdit, setModalEdit] = useState<{
    show: boolean;
    menuItem: RoomServiceMenuItemResponse;
  }>({
    show: false,
    menuItem: { id: "0", is_active: false, menu_id: "0", name: "", price: "0" },
  });

  const getAllMenuItems = async (serviceId: string, menuId: string) => {
    const menuList = await getMenuItems(serviceId, menuId);

    if (menuList.status === 200) {
      setModal({ show: true, menuList: menuList.data, menuId });
    }
  };

  return (
    <>
      <Modal
        size='lg'
        title='Прайс-лист'
        show={modal.show}
        onHide={() => setModal({ show: !modal, menuList: [], menuId: "" })}
        centered
      >
        {/* //TODO fix ts-ignore  */}
        <MenuTable columns={TableType(service_type, setModalEdit)} data={modal.menuList} />
        <Button
          size='lg'
          className='w-100 mt-8'
          variant='info'
          onClick={() => {
            router.push("/druffler/hotels");
            setModal({ show: false, menuList: [], menuId: "" });
          }}
        >
          Перейти к услуге
        </Button>
        <Button
          size='lg'
          className='w-100 mt-3'
          variant='link'
          onClick={() => setModal({ show: false, menuList: [], menuId: "" })}
        >
          Загрузить другой файл
        </Button>
      </Modal>
      <EditMenuItemModal
        modal={modalEdit}
        setModal={setModalEdit}
        //TODO fix ts-ignore
        // @ts-ignore
        serviceId={service?.menu[0]?.room_service_id}
        //TODO fix ts-ignore
        // @ts-ignore
        refreshMenu={() => getAllMenuItems(service?.menu[0]?.room_service_id, modal.menuId)}
      />
      <RoomServiceStyled key={id} className='row justify-content-between align-items-center py-8'>
        <div className='col d-flex flex-row'>
          <div className='col-2'>
            <Switch
              checked={is_active}
              onChange={async () => {
                await roomServicesService.update({ is_active: !is_active }, id);
                mutateRoomServices();
              }}
            />
          </div>
          <div className='col'>
            {service_type === "other"
              ? custom_name
              : `${servicesNames[service_type]}${custom_name ? ` (${custom_name})` : ""}`}
          </div>
        </div>
        <div className='col-2'>
          {service && service.menu && service.menu.length > 0 && (
            <Image
              src={"/svg/edit.svg"}
              width={24}
              height={24}
              alt='service edit'
              onClick={() =>
                setModal({
                  show: !modal.show,
                  //TODO fix ts-ignore
                  // @ts-ignore
                  menuList: service.menu[0]?.items,
                  //TODO fix ts-ignore
                  // @ts-ignore
                  menuId: service.menu[0]?.items[0].menu_id,
                })
              }
              style={{ cursor: "pointer" }}
            />
          )}

          <Image
            src={"/svg/bin.svg"}
            width={24}
            height={24}
            alt='service delete'
            onClick={async () => {
              const responseDelete = await deleteService(id);
              if (responseDelete.status === 200) mutateRoomServices();
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      </RoomServiceStyled>
    </>
  );
};

const RoomServiceStyled = styled.div`
  border: 1px solid white;

  &:hover {
    border: 1px solid #e6e8eb;
    border-radius: 12px;
  }
`;

export default RoomService;
