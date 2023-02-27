import { DraggableLocation } from "react-beautiful-dnd";
import { IData } from "./data";

export const onChange = (
  source: DraggableLocation,
  destination: DraggableLocation | null | undefined,
) => {
  if (
    destination &&
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return true;
  }
  return false;
};

export const deleteTask = (data: IData, { droppableId, index }: DraggableLocation) => {
  data = JSON.parse(JSON.stringify(data));
  data.columns[droppableId].taskIds.splice(index, 1);
  return data;
};

export const addTask = (data: IData, { droppableId, index }: DraggableLocation, taskId: string) => {
  data = JSON.parse(JSON.stringify(data));
  data.columns[droppableId].taskIds.splice(index, 0, taskId);
  return data;
};
