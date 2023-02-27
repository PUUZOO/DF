export interface ITask {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  titleColor: string;
  taskIds: string[];
}

export interface ITasks {
  [key: string]: ITask;
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
    "task-1": { id: "task-1", content: "aaaaaa" },
    "task-2": { id: "task-2", content: "bbbbbb" },
    "task-3": { id: "task-3", content: "cccccc" },
    "task-4": { id: "task-4", content: "dddddd" },
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
