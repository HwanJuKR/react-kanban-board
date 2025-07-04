import React from "react";
import { styled } from "styled-components";
import { ITitleProps } from "../interfaces/kanban.interface";

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

const Heading = styled.h1`
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
  font-size: 14px;
  transition: all 0.2s ease;
  border-radius: 10px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddButton = styled(TitleButton)`
  background: linear-gradient(135deg, #00b9d6, #0099b8);

  &:hover {
    background: linear-gradient(135deg, #00a5c4, #008aa6);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const AllDelButton = styled(TitleButton)`
  background: linear-gradient(135deg, #6c757d, #5a6268);

  &:hover {
    background: linear-gradient(135deg, #5a6268, #495057);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Title: React.FC<ITitleProps> = ({ onAdd, onDelete }) => {
  return (
    <TitleWrap>
      <Heading>칸반보드</Heading>
      <ButtonWrap>
        <AddButton onClick={onAdd} data-testid="addButton">
          추가하기
        </AddButton>
        <AllDelButton onClick={onDelete} data-testid="allDelButton">
          초기화
        </AllDelButton>
      </ButtonWrap>
    </TitleWrap>
  );
};

export default Title;
