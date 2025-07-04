import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {
  IBoardProps,
  IBoardContentProps,
  IKanbanItem,
  IStatus,
} from "../interfaces/kanban.interface";

const BoardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: calc(100% - 96px);
  gap: 10px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
`;

const BoardContent = styled.div<IBoardContentProps>`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isDraggingOver ? "#00d4ec" : "#00b9d6"};
  word-break: break-word;
  opacity: ${(props) => (props.$isDraggingFromThis ? 0.7 : 1)};
  transition: opacity 0.2s ease;
  overflow-y: scroll;
`;

const BoardTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

const KANBAN_STATUS: IStatus[] = ["toDo", "inProgress", "done"];

const Board: React.FC<IBoardProps> = ({
  statusItem,
  onDragEnd,
  handleDelItem,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardWrap>
        {KANBAN_STATUS.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <BoardContent
                $isDraggingOver={snapshot.isDraggingOver}
                $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid={`${status}-column`}
              >
                <BoardTitle>{status}</BoardTitle>
                {statusItem[status].map((item: IKanbanItem, index: number) => (
                  <Card
                    key={item.id}
                    item={item}
                    index={index}
                    deleteCard={handleDelItem}
                  />
                ))}
                {provided.placeholder}
              </BoardContent>
            )}
          </Droppable>
        ))}
      </BoardWrap>
    </DragDropContext>
  );
};

export default Board;
