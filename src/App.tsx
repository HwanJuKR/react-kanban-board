import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";
import { styled } from "styled-components";
import useSWR from "swr";
import DraggableCard from "./components/DraggableCard";
import {
  IBoardProps,
  IKanbanItem,
  IStatus,
} from "./interfaces/kanban.interface";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 100%;
  height: 100vh;
  background-color: #223856;
  box-sizing: border-box;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 5px;
`;

const TitleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 36px;
  color: #fff;
  border-radius: 10px;
`;

const AddButton = styled(TitleButton)`
  background-color: #00b9d6;
`;

const AllDelButton = styled(TitleButton)`
  background-color: #ff543d;
`;

const BoardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: calc(100% - 60px);
  gap: 10px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
`;

const Board = styled.div<IBoardProps>`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isDraggingOver ? "#00d4ec" : "#00b9d6"};
  word-break: break-word;
  overflow-y: scroll;
`;

const BoardTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

const PopupWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Popup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 4px;
  background: #fff;
  border-radius: 10px;
`;

const PopupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 24px;
  color: #fff;
  border-radius: 10px;
`;

const StatusSelect = styled.select`
  padding: 4px;
`;

const AddInput = styled.input`
  padding: 4px;
`;

const AddPopupButton = styled(PopupButton)`
  background-color: #00b9d6;
`;

const CancelPopupButton = styled(PopupButton)`
  background-color: #ff543d;
`;

const fetchItem = (): {
  toDo: IKanbanItem[];
  inProgress: IKanbanItem[];
  done: IKanbanItem[];
} => {
  return {
    toDo: JSON.parse(localStorage.getItem("toDo") ?? "[]"),
    inProgress: JSON.parse(localStorage.getItem("inProgress") ?? "[]"),
    done: JSON.parse(localStorage.getItem("done") ?? "[]"),
  };
};

function App() {
  const { data: kanbanItem = { toDo: [], inProgress: [], done: [] }, mutate } =
    useSWR("kanbanItem", fetchItem);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>("");
  const [newStatus, setNewStatus] = useState<IStatus>("toDo");
  const statusItem = useMemo(() => kanbanItem, [kanbanItem]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    const isValidStatus = (status: string): status is IStatus => {
      return ["toDo", "inProgress", "done"].includes(status);
    };

    if (
      isValidStatus(source.droppableId) &&
      isValidStatus(destination.droppableId)
    ) {
      if (destination.droppableId === source.droppableId) {
        // 같은 상태에서 위치 변경
        const itemList = [...kanbanItem[source.droppableId]];
        const moveItem = itemList[source.index];
        itemList.splice(source.index, 1);
        itemList.splice(destination.index, 0, moveItem);
        localStorage.setItem(source.droppableId, JSON.stringify(itemList));
      } else {
        // 다른 상태로 이동
        const sourceList = [...kanbanItem[source.droppableId]];
        const destinationList = [...kanbanItem[destination.droppableId]];
        const moveItem = sourceList[source.index];
        sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, moveItem);
        moveItem.status = destination.droppableId;
        localStorage.setItem(source.droppableId, JSON.stringify(sourceList));
        localStorage.setItem(
          destination.droppableId,
          JSON.stringify(destinationList)
        );
      }

      mutate(fetchItem(), false);
    }
  };

  const handlePopupOpen = () => {
    setIsPopup(true);
  };

  const handlePopupClose = () => {
    setIsPopup(false);
  };

  const handleAllDel = () => {
    const confirm = window.confirm("전체 리스트를 삭제하시겠습니까?");
    if (!confirm) return;

    ["toDo", "inProgress", "done"].forEach((status) =>
      localStorage.removeItem(status)
    );
    mutate({ toDo: [], inProgress: [], done: [] }, false);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItemData: IKanbanItem = {
        id: `${Date.now()}`,
        content: newItem,
        status: newStatus,
      };

      const updatedItems = [...kanbanItem[newStatus], newItemData];
      localStorage.setItem(newStatus, JSON.stringify(updatedItems));

      mutate(fetchItem(), false);
      setNewItem("");
      setNewStatus("toDo");
      setIsPopup(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value as IStatus);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  const handleDelItem = (id: string, status: IStatus) => {
    console.log(kanbanItem[status]);
    const confirm = window.confirm("항목을 샂게하시겠습니까?");
    if (!confirm) return;

    const updatedItem = {
      ...kanbanItem,
      [status]: kanbanItem[status].filter((item) => item.id !== id),
    };

    console.log(updatedItem);

    localStorage.setItem(status, JSON.stringify(updatedItem[status]));

    mutate(updatedItem, false);
  };

  return (
    <AppContainer>
      <TitleWrap>
        <Title>칸반보드</Title>
        <ButtonWrap>
          <AddButton onClick={handlePopupOpen}>추가하기</AddButton>
          <AllDelButton onClick={handleAllDel}>초기화</AllDelButton>
        </ButtonWrap>
      </TitleWrap>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardWrap>
          {(["toDo", "inProgress", "done"] as IStatus[]).map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <Board
                  $isDraggingOver={snapshot.isDraggingOver}
                  $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <BoardTitle>{status}</BoardTitle>
                  {statusItem[status].map(
                    (item: IKanbanItem, index: number) => (
                      <DraggableCard
                        key={item.id}
                        item={item}
                        index={index}
                        deleteCard={handleDelItem}
                      />
                    )
                  )}
                  {provided.placeholder}
                </Board>
              )}
            </Droppable>
          ))}
        </BoardWrap>
      </DragDropContext>

      {isPopup && (
        <PopupWrap onClick={handlePopupClose}>
          <Popup onClick={(e) => e.stopPropagation()}>
            <StatusSelect value={newStatus} onChange={handleStatusChange}>
              <option value="toDo">toDo</option>
              <option value="inProgress">inProgress</option>
              <option value="done">done</option>
            </StatusSelect>
            <AddInput
              type="text"
              value={newItem}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="내용을 입력해주세요"
            />
            <AddPopupButton onClick={handleAddItem}>추가</AddPopupButton>
            <CancelPopupButton onClick={handlePopupClose}>
              취소
            </CancelPopupButton>
          </Popup>
        </PopupWrap>
      )}
    </AppContainer>
  );
}

export default App;
