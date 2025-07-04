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
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
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
    handleStatusChange,
    handleInputChange,
    handleAddItem,
    handleDelItem,
  } = useKanban();

  return (
    <AppContainer>
      {/* 제목 영역 */}
      <Title onAdd={handlePopupOpen} onDelete={handleAllDel} />

      {/* 칸반보드 영역 */}
      <Board
        statusItem={statusItem}
        onDragEnd={onDragEnd}
        onDelItem={handleDelItem}
      />

      {/* 푸터 영역 */}
      <Footer />

      {/* 칸반보드 추가 팝업 */}
      {isPopup && (
        <Popup
          newStatus={newStatus}
          newItem={newItem}
          onStatusChange={handleStatusChange}
          onInputChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
          onAddItem={handleAddItem}
          onPopupClose={handlePopupClose}
        />
      )}
    </AppContainer>
  );
}

export default App;
