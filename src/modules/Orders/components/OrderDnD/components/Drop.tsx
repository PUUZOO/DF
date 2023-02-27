import React, { FC, ReactNode } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import styled from "styled-components";

const Content = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? "#f7f7f7" : "#fff")};
`;

interface DropProps extends Omit<DroppableProps, "children"> {
  children: ReactNode;
  className?: string;
}

const Drop: FC<DropProps> = ({ children, className, ...props }) => {
  return (
    <Droppable {...props}>
      {(provided, snapshot) => (
        <Content
          {...provided.innerRef}
          ref={provided.innerRef}
          className={className}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {children}
          {provided.placeholder}
        </Content>
      )}
    </Droppable>
  );
};

export default Drop;
