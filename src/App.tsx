import { styled } from "styled-components";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import Title from "./components/Title";
import { useKanban } from "./hooks/useKanban";

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

function App() {
  const {
    isPopup,
    newItem,
    newStatus,
    statusItem,
    onDragEnd,
    handlePopupOpen,
    handlePopupClose,
    handleAllDel,
    handleAddItem,
    handleDelItem,
    setNewItem,
    setNewStatus,
  } = useKanban();

  return (
    <AppContainer>
      {/* 제목 영역 */}
      <Title onAddClick={handlePopupOpen} onDelClick={handleAllDel} />

      {/* 칸반보드 영역 */}
      <Board
        statusItem={statusItem}
        onDragEnd={onDragEnd}
        handleDelItem={handleDelItem}
      />

      {/* 푸터 영역 */}
      <Footer />

      {/* 칸반보드 추가 팝업 */}
      {isPopup && (
        <Popup
          newStatus={newStatus}
          newItem={newItem}
          handleStatusChange={(e) => setNewStatus(e.target.value as any)}
          handleInputChange={(e) => setNewItem(e.target.value)}
          handleKeyDown={(e) => e.key === "Enter" && handleAddItem()}
          handleAddItem={handleAddItem}
          handlePopupClose={handlePopupClose}
        />
      )}
    </AppContainer>
  );
}

export default App;
