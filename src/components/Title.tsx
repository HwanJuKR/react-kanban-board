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
  border-radius: 10px;
`;

const AddButton = styled(TitleButton)`
  background-color: #00b9d6;
`;

const AllDelButton = styled(TitleButton)`
  background-color: #6c757d;
`;

const Title: React.FC<ITitleProps> = ({ onAddClick, onDelClick }) => {
  return (
    <TitleWrap>
      <Heading>칸반보드</Heading>
      <ButtonWrap>
        <AddButton onClick={onAddClick} data-testid="addButton">
          추가하기
        </AddButton>
        <AllDelButton onClick={onDelClick} data-testid="allDelButton">
          초기화
        </AllDelButton>
      </ButtonWrap>
    </TitleWrap>
  );
};

export default Title;
