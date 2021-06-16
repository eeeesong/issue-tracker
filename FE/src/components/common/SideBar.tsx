import { currentIssueSelector, labelListAtom } from "atoms/atoms";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { IUser, ILabel } from "config/interface";
import Label from "components/common/Label";
import styled from "styled-components";

const SideBar = ({ isDetail }: { isDetail?: boolean }) => {
  const { assignee, label } = useRecoilValue(currentIssueSelector);
  const [currentAssignees, setAssignees] = useState<Array<IUser>>([]);
  const [currentLabels, setLabels] = useState<Array<ILabel>>([]);
  // const [newMilestone, setNewMilestone] = useState({});

  const [isLabelOn, setLabelOn] = useState(false);
  const labelDOM = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blur = ({ target }: MouseEvent) => !labelDOM.current?.contains(target as HTMLDivElement) && setLabelOn(false);
    document.addEventListener("click", blur);
    return () => document.removeEventListener("click", blur);
  }, []);

  useEffect(() => {
    setAssignees(isDetail ? assignee : []);
    setLabels(isDetail ? label : []);
  }, [isDetail, assignee, label]);
  return (
    <SideBarWrapper>
      <SideBarContent>
        <ContentTitle>
          <TitleText>담당자</TitleText>
          <TitleButton />
        </ContentTitle>
        {currentAssignees.map((assignee) => (
          <User key={assignee.name} {...assignee} />
        ))}
      </SideBarContent>
      <SideBarContent ref={labelDOM} onClick={() => setLabelOn(true)}>
        <ContentTitle>
          <TitleText>레이블</TitleText>
          <TitleButton />
        </ContentTitle>
        {currentLabels.map((label) => (
          <LabelWrapper key={label.id}>
            <Label key={label.id} {...label} />
          </LabelWrapper>
        ))}
        {isLabelOn && <SideBarModal setState={setLabels} labels={currentLabels} />}
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

const User = ({ name, image }: { name: string; image: string }) => <UserWrapper>{name}</UserWrapper>;

const TitleButton = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3.3335V12.6668" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.33337 8H12.6667" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ISideBarModal {
  assignees?: Array<IUser>;
  labels?: Array<ILabel>;
  milestones?: Array<any>;
  setState: Dispatch<SetStateAction<Array<any>>>;
}

const SideBarModal = ({ assignees, labels, milestones, setState }: ISideBarModal) => {
  const type = assignees ? "담당자" : labels ? "레이블" : milestones ? "마일스톤" : "에러";
  const [labelList] = useRecoilState(labelListAtom);
  // useEffect(() => {fetch & setLabelList}, []);
  const emptyComponent = <ModalContent>{type}이 없습니다</ModalContent>;

  const toggle = (item: ILabel, check: boolean) =>
    setState((state) =>
      check ? state.filter(({ id }) => id !== item.id) : [...state, item].sort((a, b) => a.id - b.id)
    );
  const isLabelChecked = (label: ILabel) => labels?.filter(({ id }) => id === label.id).length !== 0;
  const labelComponent =
    labelList.length > 0
      ? labelList.map((label) => (
          <ModalContent key={label.id} onClick={() => toggle(label, isLabelChecked(label))}>
            <Label {...label} />
            <RadioIcon isChecked={isLabelChecked(label)} />
          </ModalContent>
        ))
      : emptyComponent;
  return (
    <ModalWrapper>
      <ModalTitle>{type} 추가</ModalTitle>
      {labels && labelComponent}
    </ModalWrapper>
  );
};

const RadioIcon = ({ isChecked }: { isChecked: boolean }) => (
  <RadioIconWrapper>
    {isChecked ? (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6819 14.6668 7.99998C14.6668 4.31808 11.6821 1.33331 8.00016 1.33331C4.31826 1.33331 1.3335 4.31808 1.3335 7.99998C1.3335 11.6819 4.31826 14.6666 8.00016 14.6666Z"
          stroke="#14142B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.0002 6.33331L7.3335 10.0066L5.3335 8.00665"
          stroke="#14142B"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6819 14.6668 7.99998C14.6668 4.31808 11.6821 1.33331 8.00016 1.33331C4.31826 1.33331 1.3335 4.31808 1.3335 7.99998C1.3335 11.6819 4.31826 14.6666 8.00016 14.6666Z"
          stroke="#4E4B66"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </RadioIconWrapper>
);

const SideBarWrapper = styled.div`
  position: absolute;
  width: 308px;
  right: 0px;
  top: 0px;
  background: #d9dbe9;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
`;
const SideBarContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
const LabelWrapper = styled.div`
  position: relative;
  margin-top: 8px;
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
const UserWrapper = styled.div`
  width: 244px;
  height: 44px;
  margin-top: 16px;
  display: flex;
  align-items: center;
`;
const ModalWrapper = styled.div`
  position: absolute;
  width: 240px;
  left: 36px;
  top: 72px;
  background: #d9dbe9;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
  z-index: 1;
`;
const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding-left: 16px;
  width: 224px;
  height: 48px;
  background: #f7f7fc;
  border-bottom: 1px solid #d9dbe9;
  border-radius: 16px 16px 0px 0px;
  font-size: 18px;
  line-height: 32px;
  color: #14142b;
`;
const ModalContent = styled.div`
  position: relative;
  padding-left: 16px;
  width: 224px;
  height: 44px;
  display: flex;
  align-items: center;
  background: #fefefe;
  margin-bottom: 1px;
  &:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;
const RadioIconWrapper = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 208px;
  top: 14px;
`;

export default SideBar;
