import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { styled } from "styled-components";
import { ICardProps } from "../interfaces/kanban.interface";

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  gap: 5px;

  & + & {
    margin-top: 10px;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 26px;
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: #6c757d;
  cursor: pointer;
`;

const Card: React.FC<ICardProps> = ({ item, index, deleteCard }) => {
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
          <DeleteButton onClick={() => deleteCard(item.id, item.status)}>
            삭제
          </DeleteButton>
        </CardContent>
      )}
    </Draggable>
  );
};

export default React.memo(Card);
