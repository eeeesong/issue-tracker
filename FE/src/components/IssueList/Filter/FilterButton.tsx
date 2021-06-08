import React, { EventHandler } from "react";
import styled from "styled-components";

const FilterButton = ({ onClick }: { onClick: EventHandler<React.MouseEvent> }) => (
  <ButtonWrapper onClick={onClick}>
    <ButtonText>필터</ButtonText>
    <ArrowIcon />
  </ButtonWrapper>
);

const ArrowIcon = () => (
  <ArrowWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </ArrowWrapper>
);

const ButtonWrapper = styled.div`
  position: absolute;
  width: 128px;
  height: 40px;
  left: 0px;
  top: 0px;
  background: #f7f7fc;
  border-radius: 11px 0px 0px 11px;
`;
const ButtonText = styled.div`
  position: absolute;
  width: 56px;
  height: 28px;
  left: 24px;
  top: 6px;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;
const ArrowWrapper = styled.div`
  position: absolute;
  left: 88px;
  top: 12px;
`;

export default FilterButton;
