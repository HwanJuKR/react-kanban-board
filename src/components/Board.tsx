import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {
  IBoardProps,
  IBoardContentProps,
  IKanbanItem,
  IStatus,
  IStatusColor,
  IColumnColorParams,
} from "../interfaces/kanban.interface";

const BoardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: calc(100% - 96px);
  gap: 10px;
  padding: 20px;
  border-radius: 6px;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  box-sizing: border-box;
`;

const BoardContent = styled.div<IBoardContentProps>`
  padding: 10px;
  border-radius: 6px;
  background-color: ${(props) => {
    return columnColor({
      status: props.id || "toDo",
      isDraggingOver: props.$isDraggingOver,
    }).background;
  }};
  word-break: break-word;
  overflow-y: scroll;
`;

const BoardTitle = styled.h3<{ id?: IStatus }>`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => {
    return columnColor({
      status: props.id || "toDo",
      isDraggingOver: false,
    }).title;
  }};
  text-align: center;
`;

const kanbanStatus: IStatus[] = ["toDo", "inProgress", "done"];
const boardTitle = {
  toDo: "할 일",
  inProgress: "진행 중",
  done: "완료",
};

const columnColor = ({ status, isDraggingOver }: IColumnColorParams) => {
  const color: IStatusColor = {
    toDo: {
      background: isDraggingOver ? "#fbbf24" : "#fef3c7",
      title: "#f59e0b",
    },
    inProgress: {
      background: isDraggingOver ? "#60a5fa" : "#dbeafe",
      title: "#3b82f6",
    },
    done: {
      background: isDraggingOver ? "#34d399" : "#d1fae5",
      title: "#10b981",
    },
  };

  return color[status] || color.toDo;
};

const Board: React.FC<IBoardProps> = ({ statusItem, onDragEnd, onDelItem }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardWrap>
        {kanbanStatus.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <BoardContent
                id={status}
                $isDraggingOver={snapshot.isDraggingOver}
                $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid={`${status}-column`}
              >
                <BoardTitle id={status}>
                  {boardTitle[status] || status}
                </BoardTitle>
                {statusItem[status].map((item: IKanbanItem, index: number) => (
                  <Card
                    key={item.id}
                    item={item}
                    index={index}
                    onDelete={onDelItem}
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
