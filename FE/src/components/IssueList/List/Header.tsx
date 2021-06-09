import { Dispatch } from "react";
import styled from "styled-components";

interface IHeader {
  isOpen: boolean;
  setOpen: Dispatch<boolean>;
  count: {
    open: number;
    close: number;
  };
  filteredIndex: Array<number>;
  checkedIndex: Array<number>;
  setCheckedIndex: Dispatch<Array<number>>;
}

const Header = ({ isOpen, setOpen, count, filteredIndex, checkedIndex, setCheckedIndex }: IHeader) => {
  const isCheckedAll = checkedIndex.length === filteredIndex.length;
  const checkAllEvent = () => setCheckedIndex(isCheckedAll ? [] : [...filteredIndex]);

  return (
    <HeaderWrapper>
      <CheckBox type="checkbox" checked={isCheckedAll} onClick={checkAllEvent} readOnly />
      {checkedIndex.length === 0 ? (
        <>
          <OpenIssue onClick={() => setOpen(true)}>
            <OpenIcon activated={isOpen} />
            <IssueContent activated={isOpen}>{`열린 이슈(${count.open})`}</IssueContent>
          </OpenIssue>
          <CloseIssue onClick={() => setOpen(false)}>
            <CloseIcon activated={!isOpen} />
            <IssueContent activated={!isOpen}>{`닫힌 이슈(${count.close})`}</IssueContent>
          </CloseIssue>
          <Assignee>
            <FilterText>담당자</FilterText>
            <FilterIcon />
          </Assignee>
          <Label>
            <FilterText>레이블</FilterText>
            <FilterIcon />
          </Label>
          <Milestone>
            <FilterText>마일스톤</FilterText>
            <FilterIcon />
          </Milestone>
          <Author>
            <FilterText>작성자</FilterText>
            <FilterIcon />
          </Author>
        </>
      ) : (
        <>
          <CheckedCount>{checkedIndex.length}개 이슈 선택</CheckedCount>
          <EditState>
            <FilterText>상태 수정</FilterText>
            <FilterIcon />
          </EditState>
        </>
      )}
    </HeaderWrapper>
  );
};

const OpenIcon = ({ activated }: { activated: boolean }) => (
  <IssueIconWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8 1.33337C4.3181 1.33337 1.33333 4.31814 1.33333 8.00004C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
          stroke={activated ? "#14142b" : "#6E7191"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 5.33337V8.00004" stroke={activated ? "#14142b" : "#6E7191"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10.6666H8.00667" stroke={activated ? "#14142b" : "#6E7191"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </IssueIconWrapper>
);

const CloseIcon = ({ activated }: { activated: boolean }) => (
  <IssueIconWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M14 5.33337V14H2V5.33337"
          stroke={activated ? "#14142b" : "#6E7191"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.3337 2H0.666992V5.33333H15.3337V2Z"
          stroke={activated ? "#14142b" : "#6E7191"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.66699 8H9.33366" stroke={activated ? "#14142b" : "#6E7191"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </IssueIconWrapper>
);

const FilterIcon = () => (
  <FilterIconWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </FilterIconWrapper>
);

const HeaderWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 64px;
  background: #f7f7fc;
  border-radius: 16px 16px 0px 0px;
`;
const CheckBox = styled.input`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 32px;
  top: 21px;
`;
const OpenIssue = styled.div`
  position: absolute;
  width: 105px;
  height: 32px;
  left: 80px;
  top: 16px;
`;
const CloseIssue = styled.div`
  position: absolute;
  width: 105px;
  height: 32px;
  left: 209px;
  top: 16px;
`;
const IssueContent = styled.div<{ activated: boolean }>`
  position: absolute;
  height: 28px;
  left: 20px;
  top: 2px;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: ${({ activated }) => (activated ? "#14142b" : "#6E7191")};
`;
const IssueIconWrapper = styled.div`
  position: absolute;
  left: 0%;
  right: 84.76%;
  top: 25%;
  bottom: 25%;
`;
const FilterText = styled.div`
  position: absolute;
  left: 0px;
  top: 2px;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;
const FilterIconWrapper = styled.div`
  position: absolute;
  right: 0%;
  top: 25%;
  bottom: 25%;
`;
const Assignee = styled.div`
  position: absolute;
  width: 65px;
  height: 32px;
  left: 878px;
  top: 16px;
`;
const Label = styled.div`
  position: absolute;
  width: 65px;
  height: 32px;
  left: 975px;
  top: 16px;
`;
const Milestone = styled.div`
  position: absolute;
  width: 79px;
  height: 32px;
  left: 1072px;
  top: 16px;
`;
const Author = styled.div`
  position: absolute;
  width: 65px;
  height: 32px;
  left: 1183px;
  top: 16px;
`;
const EditState = styled.div`
  position: absolute;
  width: 83px;
  height: 32px;
  left: 1165px;
  top: 16px;
`;
const CheckedCount = styled.div`
  position: absolute;
  height: 28px;
  left: 80px;
  top: 18px;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;

export default Header;
