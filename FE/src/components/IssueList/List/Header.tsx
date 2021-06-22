import { checkedIssueIdAtom, currentFilterSelector, openFilterAtom } from "atoms/atoms";
import { ILabel, IUser } from "config/interface";
import { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  AssigneeFilterModal,
  LabelFilterModal,
  MilestoneFilterModal,
  AuthorFilterModal,
  StateEditModal,
} from "./Modal";

interface IHeader {
  count: {
    open: number;
    close: number;
  };
  filteredIndex: Array<number>;
}

const Header = ({ count, filteredIndex }: IHeader) => {
  const [checkedIndex, setCheckedIndex] = useRecoilState(checkedIssueIdAtom);
  const isCheckedAll = filteredIndex.length !== 0 && checkedIndex.length === filteredIndex.length;
  const checkAllEvent = () => setCheckedIndex(isCheckedAll ? [] : [...filteredIndex]);
  const [isOpen, setOpen] = useRecoilState(openFilterAtom);

  const issues = useRecoilValue(currentFilterSelector).filter((issue) => issue.status === isOpen);

  const assigneeDOM = useRef<HTMLDivElement>(null);
  const [isAssigneeOn, setAssigneeOn] = useState(false);
  useEffect(() => {
    const blur = ({ target }: MouseEvent) =>
      !assigneeDOM.current?.contains(target as HTMLDivElement) && setAssigneeOn(false);
    document.addEventListener("click", blur);
    return () => document.removeEventListener("click", blur);
  }, []);
  const assigneeList = Array.from(
    new Set(issues.reduce((acc: Array<IUser>, cur) => [...acc, ...cur.assignees], []).map((el) => JSON.stringify(el)))
  ).map((el) => JSON.parse(el));

  const labelDOM = useRef<HTMLDivElement>(null);
  const [isLabelOn, setLabelOn] = useState(false);
  useEffect(() => {
    const blur = ({ target }: MouseEvent) => !labelDOM.current?.contains(target as HTMLDivElement) && setLabelOn(false);
    document.addEventListener("click", blur);
    return () => document.removeEventListener("click", blur);
  }, []);
  const labelList = Array.from(
    new Set(issues.reduce((acc: Array<ILabel>, cur) => [...acc, ...cur.labels], []).map((el) => JSON.stringify(el)))
  ).map((el) => JSON.parse(el));

  const milestoneDOM = useRef<HTMLDivElement>(null);
  const [isMilestoneOn, setMilestoneOn] = useState(false);
  useEffect(() => {
    const blur = ({ target }: MouseEvent) =>
      !milestoneDOM.current?.contains(target as HTMLDivElement) && setMilestoneOn(false);
    document.addEventListener("click", blur);
    return () => document.removeEventListener("click", blur);
  }, []);
  const milestoneList = Array.from(
    new Set(
      issues
        .map(({ milestone }) => milestone)
        .filter((el) => el !== null)
        .map((el) => JSON.stringify(el))
    )
  ).map((el) => JSON.parse(el));

  const authorDOM = useRef<HTMLDivElement>(null);
  const [isAuthorOn, setAuthorOn] = useState(false);
  useEffect(() => {
    const blur = ({ target }: MouseEvent) =>
      !authorDOM.current?.contains(target as HTMLDivElement) && setAuthorOn(false);
    document.addEventListener("click", blur);
    return () => document.removeEventListener("click", blur);
  }, []);
  const authorList = Array.from(new Set(issues.map(({ author }) => author).map((el) => JSON.stringify(el)))).map((el) =>
    JSON.parse(el)
  );

  const editDOM = useRef<HTMLDivElement>(null);
  const [isEditOn, setEditOn] = useState(false);
  useEffect(() => {
    const blur = ({ target }: MouseEvent) => !editDOM.current?.contains(target as HTMLDivElement) && setEditOn(false);
    document.addEventListener("click", blur);
    return () => document.removeEventListener("click", blur);
  }, []);

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
          <Assignee ref={assigneeDOM} onClick={() => setAssigneeOn(true)}>
            <FilterText>담당자</FilterText>
            <FilterIcon />
            {isAssigneeOn && <AssigneeFilterModal content={assigneeList} />}
          </Assignee>
          <Label ref={labelDOM} onClick={() => setLabelOn(true)}>
            <FilterText>레이블</FilterText>
            <FilterIcon />
            {isLabelOn && <LabelFilterModal content={labelList} />}
          </Label>
          <Milestone ref={milestoneDOM} onClick={() => setMilestoneOn(true)}>
            <FilterText>마일스톤</FilterText>
            <FilterIcon />
            {isMilestoneOn && <MilestoneFilterModal content={milestoneList} />}
          </Milestone>
          <Author ref={authorDOM} onClick={() => setAuthorOn(true)}>
            <FilterText>작성자</FilterText>
            <FilterIcon />
            {isAuthorOn && <AuthorFilterModal content={authorList} />}
          </Author>
        </>
      ) : (
        <>
          <CheckedCount>{checkedIndex.length}개 이슈 선택</CheckedCount>
          <EditState ref={editDOM} onClick={() => setEditOn(true)}>
            <FilterText>상태 수정</FilterText>
            <FilterIcon />
            {isEditOn && <StateEditModal />}
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
        <path
          d="M8 5.33337V8.00004"
          stroke={activated ? "#14142b" : "#6E7191"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10.6666H8.00667"
          stroke={activated ? "#14142b" : "#6E7191"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
        <path
          d="M6.66699 8H9.33366"
          stroke={activated ? "#14142b" : "#6E7191"}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
