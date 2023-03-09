// import "./styles.css";
import Drop from "./components/Drop";
import Drag from "./components/Drag";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState } from "react";

import { initialData } from "./data";

import { addTask, deleteTask, onChange } from "./utils";

export default function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (res: DropResult) => {
    const { source, destination, draggableId } = res;

    if (!destination) return;

    if (onChange(source, destination)) return;

    if (res.type === "TASK") {
      let newData = deleteTask(data, source);
      newData = addTask(newData, destination, draggableId);
      setData(newData);
    }

    if (res.type === "COLUMN") {
      let columnOrder = [...data.columnOrder];
      columnOrder.splice(source.index, 1);
      columnOrder.splice(destination.index, 0, draggableId);
      data.columnOrder = columnOrder;
      setData({ ...data });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Drop className='row gx-5' droppableId='all-columns' type='COLUMN' direction='horizontal'>
          {data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Drag
                className='col-md-4 h-100'
                key={columnId}
                draggableId={columnId}
                index={index}
                dragAll={false}
              >
                <Column column={column} tasks={tasks} />
              </Drag>
            );
          })}
        </Drop>
      </DragDropContext>
    </>
  );
}
