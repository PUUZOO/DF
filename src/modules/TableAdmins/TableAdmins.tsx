import { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import Table from "@/ui/Table";
import { AdminFullListResponse, AdminFullResponse } from "@/common/fetchClient";
import EmptyTable from "@/common/components/EmptyTable";
import Button from "@/common/ui/Button";
import Offcanvas from "@/common/ui/Offcanvas";
import FormAdmin from "./components/FormAdmin";
import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import { adminsService } from "@/common/services/admins-service";
import styled from "styled-components";
import { useAppSelector } from "@/redux/hooks";
import { selectDynamic } from "@/common/redux/reducers/dynamic";
import { useHotel } from "@/common/hook/useHotel";
import hotelIcon from "@/images/hotel-services.svg";

const TableAdmins: NextPageWithLayout = () => {
  const [modal, setModal] = useState<{ show: boolean; data: AdminFullResponse | null }>({
    show: false,
    data: null,
  });

  const { accountId } = useAppSelector(selectDynamic);
  const { id: hotelId } = useHotel();

  const columnHelper = createColumnHelper<AdminFullResponse>();

  return !hotelId ? (
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
    <Table<AdminFullResponse, AdminFullListResponse>
      title='Сотрудники'
      handler={`/api/accounts/${accountId}/admins/full`}
      columns={(mutate) => {
        return [
          columnHelper.display({
            id: "isDeleted",
            cell: (info) => {
              const { is_deleted } = info.row.original;

              return (
                <>
                  <IsDeletedStyled isDeleted={is_deleted}></IsDeletedStyled>
                </>
              );
            },
          }),
          columnHelper.accessor((row) => `${row.info.first_name} ${row.info.last_name}`, {
            id: "fullName",
            header: "Имя",
          }),
          columnHelper.accessor((row) => row.info.email, {
            id: "email",
            header: "Эл. почта",
          }),
          columnHelper.accessor((row) => row.info.phone, {
            id: "phone",
            header: "Телефон",
          }),
          columnHelper.accessor((row) => row.admin_type, {
            id: "admin_type",
            header: "Роль",
          }),
          columnHelper.display({
            id: "actions",
            cell: (info) => {
              const admin = info.row.original;

              return (
                <>
                  <ImageStyled
                    src={"/svg/edit.svg"}
                    alt='edit admin'
                    width={24}
                    height={24}
                    onClick={() =>
                      setModal({ show: !modal.show, data: { ...admin, ...admin.info } })
                    }
                  />

                  {/* //TODO сделать компонент подтверждения удаления */}
                  {!admin.is_deleted && (
                    <ImageStyled
                      src={"/svg/bin.svg"}
                      alt='delete admin'
                      width={24}
                      height={24}
                      // * временное решение для демонстрации работы удаления
                      onClick={async () => {
                        const response = await adminsService.delete(admin.id);
                        if (response.status === 200) mutate();
                      }}
                    />
                  )}
                </>
              );
            },
          }),
        ];
      }}
      header={(mutateTable) => {
        return (
          <>
            <Button
              variant='light'
              onClick={() => {
                setModal({ ...modal, show: !modal.show });
              }}
            >
              Добавить
            </Button>

            <Offcanvas
              title={modal.data ? "Информация о сотруднике " : "Добавить сотрудника"}
              show={modal.show}
              setHide={() => setModal({ show: !modal.show, data: null })}
            >
              <FormAdmin
                data={modal.data}
                setHide={() => setModal({ show: !modal.show, data: null })}
                mutate={mutateTable}
                accountId={accountId as string}
              />
            </Offcanvas>
          </>
        );
      }}
      emptyComponent={
        <EmptyTable
          title='Сотрудников пока нет'
          description='Некому исполнять заказы, давайте добавим первого'
          onClick={() => setModal({ ...modal, show: !modal.show })}
          btnChildren='Добавить'
        />
      }
      perPage={5}
    />
  );
};

const ImageStyled = styled(Image)`
  cursor: pointer;
`;

const IsDeletedStyled = styled.div<{ isDeleted: boolean }>`
  width: 7px;
  height: 7px;
  background-color: ${(props) => (props.isDeleted ? "var(--bs-danger)" : "var(--bs-success)")};
  border-radius: 100%;
`;

export default TableAdmins;
