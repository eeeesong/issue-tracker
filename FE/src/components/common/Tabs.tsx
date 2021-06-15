import { labelCountSelector, milestoneCountSelector } from "atoms/atoms";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Tabs = ({ type, left }: { type: string; left: number }) => {
  const labelCount = useRecoilValue(labelCountSelector);
  const milestoneCount = useRecoilValue(milestoneCountSelector);
  return (
    <TabsWrapper left={left}>
      <Tab isActivated={type === "LABEL"}>
        <Link to={"/labellist"}>
          <LabelIcon />
          <TabText>레이블</TabText>
          <TabCount left={105}>({labelCount})</TabCount>
        </Link>
      </Tab>
      <Line />
      <Tab isActivated={type === "MILESTONE"}>
        <Link to={"/milestonelist"}>
          <MilestoneIcon />
          <TabText>마일스톤</TabText>
          <TabCount left={117}>({milestoneCount})</TabCount>
        </Link>
      </Tab>
    </TabsWrapper>
  );
};

const LabelIcon = () => (
  <IconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.16659 4.66671H5.17325M14.2266 8.94004L9.44659 13.72C9.32275 13.844 9.1757 13.9424 9.01384 14.0095C8.85198 14.0766 8.67847 14.1111 8.50325 14.1111C8.32803 14.1111 8.15453 14.0766 7.99267 14.0095C7.8308 13.9424 7.68375 13.844 7.55992 13.72L1.83325 8.00004V1.33337H8.49992L14.2266 7.06004C14.4749 7.30986 14.6143 7.64779 14.6143 8.00004C14.6143 8.35229 14.4749 8.69022 14.2266 8.94004Z"
        stroke="#6E7191"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

const MilestoneIcon = () => (
  <IconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 3V3.5H9H12.634C12.9294 3.5 13.2152 3.60486 13.4413 3.79592L15.5111 5.54571C15.6497 5.66306 15.7612 5.80922 15.8376 5.97403C15.9141 6.13884 15.9537 6.31833 15.9537 6.5C15.9537 6.68167 15.9141 6.86116 15.8376 7.02597C15.7612 7.19078 15.6497 7.33694 15.5111 7.45429L13.4412 9.20417L13.4411 9.20429C13.2154 9.39516 12.9295 9.49993 12.634 9.5C12.634 9.5 12.6339 9.5 12.6339 9.5H9H8.5V10V15.25C8.5 15.3163 8.47366 15.3799 8.42678 15.4268C8.37989 15.4737 8.3163 15.5 8.25 15.5C8.1837 15.5 8.12011 15.4737 8.07322 15.4268C8.02634 15.3799 8 15.3163 8 15.25V10V9.5H7.5H3.25C2.91848 9.5 2.60054 9.3683 2.36612 9.13388C2.1317 8.89946 2 8.58152 2 8.25V4.75C2 4.06014 2.56014 3.5 3.25 3.5H7.5H8V3V0.75C8 0.683696 8.02634 0.620107 8.07322 0.573223C8.12011 0.526339 8.1837 0.5 8.25 0.5C8.3163 0.5 8.37989 0.526339 8.42678 0.573223C8.47366 0.620108 8.5 0.683697 8.5 0.75V3ZM12.634 9.00001L12.637 8.99999C12.8136 8.99894 12.9841 8.9356 13.1186 8.82116C13.1191 8.82077 13.1195 8.82038 13.12 8.81999L15.1878 7.07183L15.1878 7.07184L15.19 7.07C15.2723 6.99959 15.3384 6.91218 15.3837 6.81378C15.429 6.71539 15.4525 6.60834 15.4525 6.5C15.4525 6.39166 15.429 6.28461 15.3837 6.18622C15.3384 6.08782 15.2723 6.00041 15.19 5.93L15.1878 5.92817L13.12 4.18001C13.1195 4.17963 13.1191 4.17926 13.1187 4.17888C12.9842 4.06442 12.8136 4.00106 12.637 4.00001V4H12.634H3.25C3.05109 4 2.86032 4.07902 2.71967 4.21967C2.57902 4.36032 2.5 4.55109 2.5 4.75V8.25C2.5 8.66414 2.83586 9 3.25 9H8.25L12.634 9.00001Z"
        fill="black"
        stroke="#6E7191"
      />
    </svg>
  </IconWrapper>
);

const TabsWrapper = styled.div<{ left: number }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 321px;
  height: 40px;
  left: ${({ left }) => `${left}px`};
  border: 1px solid #d9dbe9;
  border-radius: 11px;
`;

const Tab = styled.div<{ isActivated: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 160px;
  height: 40px;
  background: ${({ isActivated }) => (isActivated ? "#D9DBE9" : "#f7f7fc")};
  border-radius: 11px 0px 0px 11px;
  &:last-child {
    border-radius: 0px 11px 11px 0px;
  }
`;
const TabText = styled.div`
  position: absolute;
  left: 53px;
  top: 5px;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;
const TabCount = styled.div<{ left: number }>`
  position: absolute;
  left: ${({ left }) => `${left}px`};
  top: 5px;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;
const Line = styled.div`
  width: 1px;
  height: 40px;
  background: #d9dbe9;
`;
const IconWrapper = styled.div`
  position: absolute;
  left: 30px;
  top: 12px;
`;

export default Tabs;
