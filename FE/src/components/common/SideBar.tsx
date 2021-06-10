// import { useState } from "react";
import styled from "styled-components";

const SideBar = () => {
  // const [assignees, setAssignees] = useState([]);
  // const [labels, setLabels] = useState([]);
  // const [milestone, setMilestone] = useState();
  return (
    <SideBarWrapper>
      <SideBarContent>
        <ContentTitle>
          <TitleText>담당자</TitleText>
          <TitleButton />
        </ContentTitle>
      </SideBarContent>
      <SideBarContent>
        <ContentTitle>
          <TitleText>레이블</TitleText>
          <TitleButton />
        </ContentTitle>
      </SideBarContent>
      <SideBarContent>
        <ContentTitle>
          <TitleText>마일스톤</TitleText>
          <TitleButton />
        </ContentTitle>
      </SideBarContent>
    </SideBarWrapper>
  );
};

const TitleButton = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3.3335V12.6668" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.33337 8H12.6667" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SideBarWrapper = styled.div`
  position: absolute;
  width: 308px;
  /* height: 290px; */
  right: 0px;
  top: 0px;
  background: #d9dbe9;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
`;
const SideBarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background: #fefefe;
  &:first-child {
    border-radius: 16px 16px 0px 0px;
  }
  & + & {
    margin-top: 1px;
  }
  &:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;
const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 244px;
`;
const TitleText = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;

export default SideBar;
