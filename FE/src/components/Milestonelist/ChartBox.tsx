import styled from "styled-components";
const ChartBox = () => {

  return (
    <ChartBoxWrapper>
      <Chart></Chart>
      <IssueInfo>
        <OpenIssue>열린이슈</OpenIssue>
        <CloseIssue>닫힌이슈</CloseIssue>
      </IssueInfo>
    </ChartBoxWrapper>
  );
};
const ChartBoxWrapper = styled.div``;
const Chart = styled.div`
  margin: 10px 0;
  width: 300px;
  height: 10px;
  border-radius: 10px;
  border: 1px solid black;
`;
const IssueInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const OpenIssue = styled.div``;
const CloseIssue = styled.div`
  margin-left: 10px;
`;

export default ChartBox;
