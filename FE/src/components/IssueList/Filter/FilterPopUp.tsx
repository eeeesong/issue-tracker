import { Dispatch } from "react";
import styled from "styled-components";

interface IFilter {
  id: number;
  title: string;
  body: string;
}

const FilterPopUp = ({ list, index, setIndex }: { list: Array<IFilter>; index: number; setIndex: Dispatch<number> }) => (
  <PopUpWrapper>
    <PopUpHeader>
      <HeaderText>이슈 필터</HeaderText>
    </PopUpHeader>
    <ContentContainer>
      {list.map((el) => (
        <PopUpContent key={el.id} content={el.title} id={el.id} index={index} setIndex={setIndex} />
      ))}
    </ContentContainer>
  </PopUpWrapper>
);

const PopUpContent = ({ content, id, index, setIndex }: { content: string; id: number; index: number; setIndex: Dispatch<number> }) => (
  <ContentWrapper onClick={() => setIndex(id)}>
    <ContentText>{content}</ContentText>
    <RadioButton isChecked={id === index} />
  </ContentWrapper>
);

const RadioButton = ({ isChecked }: { isChecked: boolean }) => (
  <RadioButtonWrapper>
    {isChecked ? (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00004 1.33337C4.31814 1.33337 1.33337 4.31814 1.33337 8.00004C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z"
          stroke="#14142B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M11 6.33337L7.33337 10.0067L5.33337 8.00671" stroke="#14142B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00004 1.33337C4.31814 1.33337 1.33337 4.31814 1.33337 8.00004C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z"
          stroke="#4E4B66"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </RadioButtonWrapper>
);

const PopUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: absolute;
  width: 240px;
  height: 273px;
  left: 0px;
  top: 48px;
  background: #d9dbe9;

  border: 1px solid #d9dbe9;
  border-radius: 16px;
  z-index: 2;
`;
const PopUpHeader = styled.div`
  position: relative;
  width: 240px;
  height: 48px;
  background: #f7f7fc;
  border-radius: 16px 16px 0px 0px;
`;
const HeaderText = styled.div`
  position: absolute;
  width: 184px;
  height: 32px;
  left: 16px;
  top: 8px;
  font-size: 18px;
  line-height: 32px;
  display: flex;
  align-items: center;
  color: #14142b;
`;
const ContentContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 48px;
`;
const ContentWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 240px;
  height: 44px;
  background: #fefefe;
  border-top: 1px solid #d9dbe9;
  &:last-child {
    height: 43px;
    background: #fefefe;
    border-radius: 0px 0px 16px 16px;
  }
`;
const ContentText = styled.div`
  position: absolute;
  left: 16px;
  top: 8px;
  font-size: 16px;
  line-height: 28px;
  color: #4e4b66;
`;
const RadioButtonWrapper = styled.div`
  position: absolute;
  left: 208px;
  top: 14px;
`;

export default FilterPopUp;
