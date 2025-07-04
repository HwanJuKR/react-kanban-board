import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { styled } from "styled-components";
import { ICardProps } from "../interfaces/kanban.interface";

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 6px;
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  gap: 6px;

  & + & {
    margin-top: 10px;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  flex-shrink: 0;
  width: 34px;
  height: 26px;
  color: #fff;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  cursor: pointer;
`;

const Card: React.FC<ICardProps> = ({ item, index, onDelete }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <CardContent
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-testid="card"
        >
          {item.content}
          <DeleteButton onClick={() => onDelete(item.id, item.status)}>
            삭제
          </DeleteButton>
        </CardContent>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
