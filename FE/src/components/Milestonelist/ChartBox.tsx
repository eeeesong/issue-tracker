import styled from "styled-components";
import MilestoneBar from "components/common/MilestoneBar";
const ChartBox = () => {
  return (
    <ChartBoxWrapper>
      <MilestoneBar />
      <IssueInfo>
        <OpenIssue>열린이슈</OpenIssue>
        <CloseIssue>닫힌이슈</CloseIssue>
      </IssueInfo>
    </ChartBoxWrapper>
  );
};
const ChartBoxWrapper = styled.div``;
const IssueInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const OpenIssue = styled.div``;
const CloseIssue = styled.div`
  margin-left: 10px;
`;

export default ChartBox;
