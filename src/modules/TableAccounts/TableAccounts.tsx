import { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import Table from "@/ui/Table";
import { AccountResponse, AccountsListResponse } from "@/common/types/SwaggerTypes";
import EmptyTable from "@/common/components/EmptyTable";
import Button from "@/common/ui/Button";
import Offcanvas from "@/common/ui/Offcanvas";
import FormAccount from "./components/FormAccount";
import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import styled from "styled-components";
import { accountsService } from "@/common/services/accounts-service";
import { useSWRConfig } from "swr";

const TableAccounts: NextPageWithLayout = () => {
  const [modal, setModal] = useState<{ show: boolean; data: AccountResponse | null }>({
    show: false,
    data: null,
  });

  const columnHelper = createColumnHelper<AccountResponse>();
  const { mutate } = useSWRConfig();

  return (
    <Table<AccountResponse, AccountsListResponse>
      title='Аккаунты'
      handler='/api/accounts'
      columns={(mutate) => {
        return [
          columnHelper.accessor("is_deleted", {
            header: "",
            cell: (info) => {
              const isDeleted = info.getValue();

              return (
                <>
                  <IsDeletedStyled isDeleted={isDeleted}></IsDeletedStyled>
                </>
              );
            },
          }),
          {
            header: "Название",
            accessorKey: "name",
          },
          {
            header: "Имя",
            accessorKey: "contact_name",
          },
          {
            header: "Телефон",
            accessorKey: "contact_phone",
          },
          // {
          //   header: "Активен",
          //   accessorKey: "is_active",
          // },
          columnHelper.accessor("id", {
            header: "",
            cell: (info) => {
              const account = info.row.original;

              return (
                <>
                  <ImageStyled
                    src={"/svg/edit.svg"}
                    alt='edit account'
                    width={24}
                    height={24}
                    onClick={() => setModal({ show: !modal.show, data: account })}
                  />

                  {/* //TODO сделать компонент подтверждения удаления */}
                  {!account.is_deleted && (
                    <ImageStyled
                      src={"/svg/bin.svg"}
                      alt='delete account'
                      width={24}
                      height={24}
                      // * временное решение для демонстрации работы удаления
                      onClick={async () => {
                        const response = await accountsService.delete(account.id);
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
              title={modal.data ? "Информация об аккаунте " : "Добавить аккаунт"}
              // title={modal.data ? "Информация о сотруднике " : "Добавить сотрудника"}
              show={modal.show}
              setHide={() => setModal({ show: !modal.show, data: null })}
            >
              <FormAccount
                data={modal.data}
                setHide={() => setModal({ show: !modal.show, data: null })}
                mutate={() => {
                  mutateTable();
                  mutate("/api/accounts");
                }}
              />
            </Offcanvas>
          </>
        );
      }}
      emptyComponent={
        <EmptyTable
          title='Аккаунтов пока нет'
          description='Для добавления отелей и сотрудников требуется аккаунт'
          // title='Сотрудников пока нет'
          // description='Некому исполнять заказы, давайте добавим первого'
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
  /* // TODO не получилось взять значения из перемененных --bs-danger и --bs-success - выяснить почему */
  background-color: ${({ isDeleted }) => (isDeleted ? "#dc3545" : "#198754")};
  border-radius: 100%;
`;

export default TableAccounts;
