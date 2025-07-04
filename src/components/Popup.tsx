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
  flex-direction: column;
  min-width: 320px;
  padding: 24px;
  gap: 16px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const PopupTitle = styled.h2`
  margin-bottom: 8px;
  font-size: 18px;
  color: #333;
  text-align: center;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #555;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 8px;
`;

const PopupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #00b9f6;
    box-shadow: 0 0 0 2px rgba(0, 185, 214, 0.1);
  }
`;

const AddInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #00b9f6;
    box-shadow: 0 0 0 2px rgba(0, 185, 214, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const AddPopupButton = styled(PopupButton)`
  background: linear-gradient(135deg, #00b9d6, #0099b8);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00a5c4, #008aa6);
  }
`;

const CancelPopupButton = styled(PopupButton)`
  background: linear-gradient(135deg, #6c757d, #5a6268);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5a6268, #495057);
  }
`;

const Popup: React.FC<IPopupProps> = ({
  newStatus,
  newItem,
  onStatusChange,
  onInputChange,
  onKeyDown,
  onAddItem,
  onPopupClose,
}) => {
  return ReactDOM.createPortal(
    <PopupWrap onClick={onPopupClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <PopupTitle>새 항목 추가</PopupTitle>
        <InputWrap>
          <Label htmlFor="statusSelect">상태</Label>
          <StatusSelect
            id="statusSelect"
            value={newStatus}
            onChange={onStatusChange}
          >
            <option value="toDo">할 일</option>
            <option value="inProgress">진행 중</option>
            <option value="done">완료</option>
          </StatusSelect>
        </InputWrap>
        <InputWrap>
          <Label htmlFor="addInput">내용</Label>
          <AddInput
            id="addInput"
            type="text"
            value={newItem}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder="내용을 입력해주세요"
            data-testid="addInput"
            autoFocus
          />
        </InputWrap>
        <ButtonWrap>
          <CancelPopupButton onClick={onPopupClose}>취소</CancelPopupButton>
          <AddPopupButton
            onClick={onAddItem}
            disabled={!newItem.trim()}
            data-testid="addPopupButton"
          >
            추가
          </AddPopupButton>
        </ButtonWrap>
      </PopupContainer>
    </PopupWrap>,
    document.body
  );
};

export default Popup;
