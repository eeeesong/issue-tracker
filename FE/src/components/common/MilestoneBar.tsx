import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IssueDetailAtom } from "atoms/atoms";
const MilestoneBar = () => {
  const [detailIssue, setDetailIssue] = useRecoilState(IssueDetailAtom);
  //   console.log(detailIssue);
  return <MilestoneBarWrapper max={100} value={70}></MilestoneBarWrapper>;
};
const Two = styled.div`
  border: 1px solid blue;
  flex: auto;
`;
const One = styled.div`
  border: 1px solid red;
  flex: auto;
`;
const MilestoneBarWrapper = styled.progress`
  width: 244px;
`;

export default MilestoneBar;
