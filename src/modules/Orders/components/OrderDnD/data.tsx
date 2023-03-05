import { RoomServicesTypes } from "@/common/types/SwaggerTypes";
import { OrderCardProps, StatusType } from "./components/OrderCard";

// export interface ITask {
//   id: string;
//   content: string;
// }

export interface Column {
  id: string;
  title: string;
  titleColor: string;
  taskIds: string[];
}

export interface ITasks {
  [key: string]: OrderCardProps;
}

export interface IColumns {
  [key: string]: Column;
}

export interface IData {
  tasks: ITasks;
  columns: IColumns;
  columnOrder: string[];
}

export const initialData: IData = {
  tasks: {
    "task-1": {
      id: "task-1",
      roomNumber: "102",
      serviceType: RoomServicesTypes.ORDER_FOOD,
      guestName: "Elena Nemarossi",
      createdAt: "1678040803714",
      adminName: "stas stas",
      statusType: StatusType.OPENED,
    },
    "task-2": {
      id: "task-2",
      roomNumber: "111",
      serviceType: RoomServicesTypes.ORDER_FOOD,
      guestName: "Katea Nemarossi",
      createdAt: "1678040603314",
      adminName: "maiia maiia",
      statusType: StatusType.OPENED,
    },
    "task-3": {
      id: "task-3",
      roomNumber: "402",
      serviceType: RoomServicesTypes.ORDER_FOOD,
      guestName: "Maria Nemarossi",
      createdAt: "1678043802714",
      adminName: "sanek larek",
      statusType: StatusType.CLOSED,
    },
    "task-4": {
      id: "task-4",
      roomNumber: "992",
      serviceType: RoomServicesTypes.ORDER_FOOD,
      guestName: "Alena Nemarossi",
      createdAt: "1678040403714",
      adminName: "alena na",
      statusType: StatusType.OPENED,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Новые",
      titleColor: "#E9EAEB",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "В работе",
      titleColor: "#CFE7FF",
      taskIds: ["task-4"],
    },
    "column-3": {
      id: "column-3",
      title: "Выполнены",
      titleColor: "#D5EDDF",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
