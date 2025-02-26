import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { styled } from "styled-components";
import { IDragabbleCardProp } from "../interfaces/kanban.interface";

const Card = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;

  & + & {
    margin-top: 10px;
  }
`;

const DraggableCard: React.FC<IDragabbleCardProp> = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.content}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
