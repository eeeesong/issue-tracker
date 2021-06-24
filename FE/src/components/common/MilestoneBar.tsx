import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IssueDetailAtom } from "atoms/atoms";
const MilestoneBar = () => {
  const [detailIssue, setDetailIssue] = useRecoilState(IssueDetailAtom);
  //   console.log(detailIssue);
  return <MilestoneBarWrapper></MilestoneBarWrapper>;
};
const Two = styled.div`
  border: 1px solid blue;
  flex: auto;
`;
const One = styled.div`
  border: 1px solid red;
  flex: auto;
`;
const MilestoneBarWrapper = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 10px;
  border-radius: 10px;
  background-color: #eff0f6;
  /* border: 1px solid black; */
  display: flex;
`;

export default MilestoneBar;
