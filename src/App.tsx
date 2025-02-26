import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useState } from "react";
import { styled } from "styled-components";
import useSWR from "swr";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 100vw;
  height: 100vh;
  background-color: #223856;
  box-sizing: border-box;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
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
  padding: 10px 16px;
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
  height: 100%;
  gap: 10px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
`;

const Board = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #00b9d6;
`;

const Card = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;

  & + & {
    margin-top: 10px;
  }
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
  padding: 5px 8px;
  color: #fff;
  border-radius: 10px;
`;

const AddPopupButton = styled(PopupButton)`
  background-color: #00b9d6;
`;

const CancelPopupButton = styled(PopupButton)`
  background-color: #ff543d;
`;

interface IKanbanItem {
  id: string;
  content: string;
}

const fetchItem = (): IKanbanItem[] => {
  const storedItem = localStorage.getItem("kanbanItem");

  return storedItem ? JSON.parse(storedItem) : [];
};

function App() {
  const { data: kanbanItem = [], mutate } = useSWR<IKanbanItem[]>("kanbanItem", fetchItem);
  const [isPopup, setIsPopup] = useState(false);
  const [newItem, setNewItem] = useState("");

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const updatedItem = Array.from(kanbanItem);
    const [movedItem] = updatedItem.splice(source.index, 1);
    updatedItem.splice(destination.index, 0, movedItem);

    localStorage.setItem("kanbanItem", JSON.stringify(updatedItem));
    mutate(updatedItem, false);
  };

  const handlePopupOpen = () => {
    setIsPopup(true);
  };

  const handlePopupClose = () => {
    setIsPopup(false);
  };

  const handleAllDel = () => {
    localStorage.removeItem("kanbanItem");
    mutate([], false);
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItemData: IKanbanItem = {
        id: `${Date.now()}`,
        content: newItem,
      };
      const updatedItem = [...kanbanItem, newItemData];

      localStorage.setItem("IKanbanItem", JSON.stringify(updatedItem));
      mutate(updatedItem, false);
      setNewItem("");
      setIsPopup(false);
    }
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
          <Droppable droppableId="droppable">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {kanbanItem.map((item: IKanbanItem, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                ))}
                {provided.placeholder}
              </Board>
            )}
          </Droppable>
        </BoardWrap>
      </DragDropContext>

      {isPopup && (
        <PopupWrap>
          <Popup>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="내용을 입력해주세요"
            />
            <AddPopupButton onClick={handleAddItem}>추가</AddPopupButton>
            <CancelPopupButton onClick={handlePopupClose}>취소</CancelPopupButton>
          </Popup>
        </PopupWrap>
      )}
    </AppContainer>
  );
}

export default App;
