import React, { FC, ReactNode } from "react";
import { Draggable, DraggableProps, DraggableProvided } from "react-beautiful-dnd";

interface IXDrag extends Omit<DraggableProps, "children"> {
  className?: string;
  children: ReactNode;
  dragAll?: boolean;
}

const Drag: FC<IXDrag> = ({ className, children, dragAll, ...props }) => {
  if (!React.isValidElement(children)) return <div />;

  return (
    <Draggable {...props}>
      {(provided) => {
        const dragHandleProps = dragAll ? provided.dragHandleProps : {};
        return (
          <div
            className={`${className}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...dragHandleProps}
          >
            {React.cloneElement(children as React.ReactElement<{ provided: DraggableProvided }>, {
              provided,
            })}
          </div>
        );
      }}
    </Draggable>
  );
};

Drag.defaultProps = {
  dragAll: true,
};

export default Drag;
