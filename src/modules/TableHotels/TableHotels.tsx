import { NextPageWithLayout } from "@/pages/_app";
import Table from "@/ui/Table";
import { HotelListResponse, HotelResponse } from "@/common/types/SwaggerTypes";
import EmptyTable from "@/common/components/EmptyTable";
import Button from "@/common/ui/Button";
import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import styled from "styled-components";
import { useAppSelector } from "@/common/redux/hooks";
import { selectDynamic } from "@/common/redux/reducers/dynamic";
import { useRouter } from "next/router";
import { hotelsService } from "@/common/services/hotels-service";

const TableAccounts: NextPageWithLayout = () => {
  const dynamic = useAppSelector(selectDynamic);
  const accountId = dynamic.accountId;

  const router = useRouter();

  const columnHelper = createColumnHelper<HotelResponse>();

  if (!accountId) return <>Выберете аккаунт</>;

  return (
    // TODO не понял, здесь косяк в типе или мне нужно что-то исправить
    // @ts-ignore
    <Table<HotelResponse, HotelListResponse>
      title='Отели'
      handler={`/api/accounts/${accountId}/hotels`}
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
            header: "Активен",
            accessorKey: "is_active",
          },
          {
            header: "Состояние",
            accessorKey: "state",
          },
          columnHelper.accessor("id", {
            header: "",
            cell: (info) => {
              const hotel = info.row.original;

              return (
                <>
                  {/* <ImageStyled
                    src={"/svg/edit.svg"}
                    alt='edit account'
                    width={24}
                    height={24}
                    onClick={() => setModal({ show: !modal.show, data: account })}
                  /> */}

                  {/* //TODO сделать компонент подтверждения удаления */}
                  {!hotel.is_deleted && (
                    <ImageStyled
                      src={"/svg/bin.svg"}
                      alt='delete hotel'
                      width={24}
                      height={24}
                      // * временное решение для демонстрации работы удаления
                      onClick={async () => {
                        const response = await hotelsService.delete(hotel.id);
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
      header={() => {
        return (
          <>
            <Button
              variant='light'
              onClick={() => {
                router.push("/hotel-add");
              }}
            >
              Добавить
            </Button>
          </>
        );
      }}
      emptyComponent={
        <EmptyTable
          title='Отелей пока нет'
          description='Добавьте отель'
          onClick={() => router.push("/hotel-add")}
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
