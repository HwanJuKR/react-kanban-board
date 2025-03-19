import React from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";
import { IPopupProps } from "../interfaces/kanban.interface";

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

const PopupContainer = styled.div`
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

const Popup: React.FC<IPopupProps> = ({
  newStatus,
  newItem,
  handleStatusChange,
  handleInputChange,
  handleKeyDown,
  handleAddItem,
  handlePopupClose,
}) => {
  return ReactDOM.createPortal(
    <PopupWrap onClick={handlePopupClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
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
        <CancelPopupButton onClick={handlePopupClose}>취소</CancelPopupButton>
      </PopupContainer>
    </PopupWrap>,
    document.body
  );
};

export default Popup;
