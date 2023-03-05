import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { Column as ColumnType, ITask } from "../data";
import Drag from "./Drag";
import Drop from "./Drop";
import plusIcon from "@/images/plus-dark.svg";
import OrderCard, { StatusType } from "./OrderCard";
import { RoomServicesTypes } from "@/types/SwaggerTypes";

interface ColumnProps {
  className?: string;
  column: ColumnType;
  tasks: ITask[];
  provided?: DraggableProvided;
}

const Column: FC<ColumnProps> = ({ column, tasks, provided }) => {
  return (
    <WrapperStyled>
      {/* <h3 {...provided?.dragHandleProps}>{column.title}</h3> */}
      <div className='d-flex justify-content-between align-items-center mb-7'>
        <TitleStyled style={{ background: column.titleColor }}>{column.title}</TitleStyled>
        <img src={plusIcon.src} alt='' />
      </div>
      <DropStyled droppableId={column.id} type='TASK'>
        {tasks.map((task, index) => (
          <Drag draggableId={task.id} index={index} key={task.id}>
            {/* <CardStyled className='border rounded mb-3'>{task.id}</CardStyled> */}
            <OrderCard
              id={task.id}
              roomNumber={task.roomNumber}
              serviceType={task.serviceType}
              guestName={task.guestName}
              adminName={task.adminName}
              createdAt={task.createdAt}
              statusType={task.statusType}
            ></OrderCard>
          </Drag>
        ))}
      </DropStyled>
    </WrapperStyled>
  );
};

const TitleStyled = styled.div`
  border-radius: 6px;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const WrapperStyled = styled.div`
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const DropStyled = styled(Drop)``;

const CardStyled = styled.div`
  height: 192px;
  padding: 20px;
  background: white;
`;

export default Column;
