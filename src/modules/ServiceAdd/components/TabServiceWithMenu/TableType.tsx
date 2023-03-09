import { RoomServiceMenuItemResponse, RoomServicesTypes } from "@/types/SwaggerTypes";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { MenuItemEditModal } from "./components/EditMenuItemModal/EditMenuItemModal";

const columnHelper = createColumnHelper();

export const TableType = (
  type: RoomServicesTypes,
  setModalEdit: Dispatch<SetStateAction<MenuItemEditModal>>,
) => {
  const editIcon = columnHelper.display({
    id: "actions",
    cell: (info) => {
      const menuItem = info.row.original;

      return (
        <>
          <Image
            src={"/svg/edit.svg"}
            alt='edit service'
            width={24}
            height={24}
            onClick={() => {
              setModalEdit({ show: true, menuItem: menuItem as RoomServiceMenuItemResponse });
            }}
          />
        </>
      );
    },
  });

  if (type === RoomServicesTypes.SPA) {
    return [
      {
        header: "Процедура",
        accessorKey: "name",
      },

      {
        header: "Цена",
        accessorKey: "price",
      },
      editIcon,
    ];
  }

  if (type === RoomServicesTypes.LAUNDRY) {
    return [
      {
        header: "Вещь",
        accessorKey: "name",
      },

      // TODO уточнить какой формат csv будет у прачечной
      {
        header: "Стирка",
        accessorKey: "price",
      },

      {
        header: "Глажка",
        accessorKey: "price",
      },
      editIcon,
    ];
  }

  return [
    {
      header: "Блюдо",
      accessorKey: "name",
    },
    {
      header: "Ингредиенты",
      accessorKey: "description",
    },
    {
      header: "Вес",
      accessorKey: "weight",
    },
    {
      header: "Цена",
      accessorKey: "price",
    },
    editIcon,
  ];
};
