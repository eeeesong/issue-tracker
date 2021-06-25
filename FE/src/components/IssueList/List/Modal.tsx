import { checkedIssueIdAtom, issueListAtom } from "atoms/atoms";
import { ILabel, IMilestone, IUser } from "config/interface";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export const AssigneeFilterModal = ({ content }: { content: Array<IUser> }) => {
  return (
    <HeaderFilterModalWrapper>
      <ModalHeader>담당자 필터</ModalHeader>
      <ModalContentWrapper>
        <ModalContent>
          담당자가 없는 이슈
          <ModalRadioIcon />
        </ModalContent>
        {content.map(({ id, name }: IUser) => (
          <ModalContent key={id}>
            {name}
            <ModalRadioIcon />
          </ModalContent>
        ))}
      </ModalContentWrapper>
    </HeaderFilterModalWrapper>
  );
};

export const LabelFilterModal = ({ content }: { content: Array<ILabel> }) => {
  return (
    <HeaderFilterModalWrapper>
      <ModalHeader>레이블 필터</ModalHeader>
      <ModalContentWrapper>
        <ModalContent>
          레이블이 없는 이슈
          <ModalRadioIcon />
        </ModalContent>
        {content.map(({ id, name, color_code }: ILabel) => (
          <ModalContent key={id}>
            <LabelCircle color_code={color_code} />
            &nbsp;{name}
            <ModalRadioIcon />
          </ModalContent>
        ))}
      </ModalContentWrapper>
    </HeaderFilterModalWrapper>
  );
};

const LabelCircle = ({ color_code }: { color_code: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" fill={color_code} stroke="#D9DBE9" />
  </svg>
);

export const MilestoneFilterModal = ({ content }: { content: Array<IMilestone | null> }) => {
  return (
    <HeaderFilterModalWrapper>
      <ModalHeader>마일스톤 필터</ModalHeader>
      <ModalContentWrapper>
        <ModalContent>
          마일스톤이 없는 이슈
          <ModalRadioIcon />
        </ModalContent>
        {content.map((milestone: IMilestone | null) => (
          <ModalContent key={milestone?.title}>
            {milestone?.title}
            <ModalRadioIcon />
          </ModalContent>
        ))}
      </ModalContentWrapper>
    </HeaderFilterModalWrapper>
  );
};

export const AuthorFilterModal = ({ content }: { content: Array<IUser> }) => {
  return (
    <HeaderFilterModalWrapper>
      <ModalHeader>작성자 필터</ModalHeader>
      <ModalContentWrapper>
        <ModalContent>
          작성자가 없는 이슈
          <ModalRadioIcon />
        </ModalContent>
        {content.map(({ id, name }: IUser) => (
          <ModalContent key={id}>
            {name}
            <ModalRadioIcon />
          </ModalContent>
        ))}
      </ModalContentWrapper>
    </HeaderFilterModalWrapper>
  );
};

export const StateEditModal = () => {
  const [checkedIssueIndex, setCheckedIssueIndex] = useRecoilState(checkedIssueIdAtom);
  const [, setIssueList] = useRecoilState(issueListAtom);
  const refreshIssueList = () =>
    fetch(`http://3.34.122.67/api/issues/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((json) => setIssueList(json.data));
  const editIssue = (type: "open" | "close") => {
    fetch(`http://3.34.122.67/api/issues/${type}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ issueId: checkedIssueIndex }),
    })
      .then(() => refreshIssueList())
      .then(() => setCheckedIssueIndex([]))
      .catch(() => console.error("fetch error in IssueList/Modal, check network!"));
  };
  return (
    <HeaderFilterModalWrapper>
      <ModalHeader>상태 변경</ModalHeader>
      <ModalContentWrapper>
        <ModalContent onClick={() => editIssue("open")}>선택한 이슈 열기</ModalContent>
        <ModalContent onClick={() => editIssue("close")}>선택한 이슈 닫기</ModalContent>
      </ModalContentWrapper>
    </HeaderFilterModalWrapper>
  );
};

const ModalRadioIcon = () => (
  <ModalIconWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z"
        stroke="#4E4B66"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </ModalIconWrapper>
);

const HeaderFilterModalWrapper = styled.div`
  position: absolute;
  width: 240px;
  left: -140px;
  top: 40px;
  background: #d9dbe9;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
  z-index: 2;
`;
const ModalHeader = styled.div`
  position: relative;
  width: 224px;
  height: 48px;
  padding-left: 16px;
  background: #f7f7fc;
  border-radius: 16px 16px 0px 0px;

  font-size: 18px;
  line-height: 32px;

  display: flex;
  align-items: center;
  color: #14142b;
`;
const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalContent = styled.div`
  position: relative;
  width: 224px;
  height: 44px;
  background: #fefefe;
  margin-top: 1px;
  padding-left: 16px;
  font-size: 18px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #4e4b66;
  &:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;
const ModalIconWrapper = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 208px;
  top: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
