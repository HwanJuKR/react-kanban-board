import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { styled } from "styled-components";

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

const Title = styled.h1`
  width: 100%;
  padding: 20px 0;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  box-sizing: border-box;
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

function App() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <AppContainer>
      <Title>칸반보드</Title>
      <DragDropContext onDragEnd={() => {}}>
        <BoardWrap>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item}
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
    </AppContainer>
  );
}

export default App;
