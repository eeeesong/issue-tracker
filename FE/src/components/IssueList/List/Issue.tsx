import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Label from "components/common/Label";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentIssueIdAtom, issueListAtom } from "atoms/atoms";
import { useHistory } from "react-router-dom";

interface IIssue {
  id: number;
  checkedIndex: Array<number>;
  setCheckedIndex: Dispatch<SetStateAction<Array<number>>>;
}

const Issue = ({ id, checkedIndex, setCheckedIndex }: IIssue) => {
  const { title, labels, milestone, author, status } = useRecoilValue(issueListAtom).filter(
    (issue) => issue.issueNumber === id
  )[0];
  const check = () =>
    setCheckedIndex((arr) =>
      checkedIndex.includes(id) ? [...arr.filter((index) => index !== id)] : [...arr, id].sort()
    );
  const [, setCurrentIssueId] = useRecoilState(currentIssueIdAtom);

  const history = useHistory();
  const moveDetailEvent = () => {
    setCurrentIssueId(id);
    history.push("/detailissue");
  };
  return (
    <IssueWrapper>
      <CheckBox type="checkbox" checked={checkedIndex.includes(id)} onClick={check} readOnly />
      <div onClick={moveDetailEvent}>
        <IssueTitle>
          <OpenIcon status={status}/>
          <TitleText>{title}</TitleText>
          {labels.map(({ id, name, color_code }) => (
            <LabelWrapper key={id}>
              <Label key={id} name={name} color_code={color_code} />
            </LabelWrapper>
          ))}
        </IssueTitle>
        <IssueInfo>
          <InfoText>#{id}</InfoText>
          <InfoText>
            이 이슈가 {"대충시간처리로직"} 전, {author.name}님에 의해 작성되었습니다
          </InfoText>
          {milestone && (
            <InfoText>
              <MilestoneIcon />
              {" " + milestone.title}
            </InfoText>
          )}
        </IssueInfo>
      </div>
    </IssueWrapper>
  );
};

const OpenIcon = ({ status }: { status: boolean }) =>
  status ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8 1.33337C4.3181 1.33337 1.33333 4.31814 1.33333 8.00004C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
          fill="#C7EBFF"
          stroke="#007AFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 5.33337V8.00004" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10.6666H8.00667" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path d="M14 5.33325V13.9999H2V5.33325" fill="#CCD4FF" />
        <path
          d="M14 5.33325V13.9999H2V5.33325"
          stroke="#0025E7"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.3332 2H0.666504V5.33333H15.3332V2Z"
          stroke="#0025E7"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.6665 8H9.33317"
          stroke="#0025E7"
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
  );

const MilestoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.75 0C7.94891 0 8.13968 0.0790176 8.28033 0.21967C8.42098 0.360322 8.5 0.551088 8.5 0.75V3H12.134C12.548 3 12.948 3.147 13.264 3.414L15.334 5.164C15.5282 5.32828 15.6842 5.53291 15.7912 5.76364C15.8982 5.99437 15.9537 6.24566 15.9537 6.5C15.9537 6.75434 15.8982 7.00563 15.7912 7.23636C15.6842 7.46709 15.5282 7.67172 15.334 7.836L13.264 9.586C12.9481 9.85325 12.5478 9.99993 12.134 10H8.5V15.25C8.5 15.4489 8.42098 15.6397 8.28033 15.7803C8.13968 15.921 7.94891 16 7.75 16C7.55109 16 7.36032 15.921 7.21967 15.7803C7.07902 15.6397 7 15.4489 7 15.25V10H2.75C2.28587 10 1.84075 9.81563 1.51256 9.48744C1.18437 9.15925 1 8.71413 1 8.25V4.75C1 3.784 1.784 3 2.75 3H7V0.75C7 0.551088 7.07902 0.360322 7.21967 0.21967C7.36032 0.0790176 7.55109 0 7.75 0ZM7.75 8.5H12.134C12.1931 8.49965 12.2501 8.47839 12.295 8.44L14.365 6.69C14.3924 6.66653 14.4145 6.63739 14.4296 6.60459C14.4447 6.57179 14.4525 6.53611 14.4525 6.5C14.4525 6.46389 14.4447 6.42821 14.4296 6.39541C14.4145 6.36261 14.3924 6.33347 14.365 6.31L12.295 4.56C12.2501 4.52161 12.1931 4.50035 12.134 4.5H2.75C2.6837 4.5 2.62011 4.52634 2.57322 4.57322C2.52634 4.62011 2.5 4.6837 2.5 4.75V8.25C2.5 8.388 2.612 8.5 2.75 8.5H7.75Z"
      fill="#6E7191"
    />
  </svg>
);

const IssueWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 100px;
  background: #fefefe;
  margin-top: 1px;
  &:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;
const CheckBox = styled.input`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 32px;
  top: 21px;
`;
const IssueTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  height: 32px;
  left: 80px;
  top: 16px;
`;
const TitleText = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  color: #14142b;
  margin-left: 8px;
`;
const LabelWrapper = styled.div`
  margin-left: 8px;
`;
const IssueInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  height: 28px;
  left: 80px;
  top: 56px;
`;
const InfoText = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
  & + & {
    margin-left: 16px;
  }
`;

export default Issue;
