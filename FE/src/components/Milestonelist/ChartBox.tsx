import styled from "styled-components";

const ChartBox = () => {
  return (
    <ChartBoxWrapper>
      <Chart></Chart>
      <ChartInfo>
        <Percent>퍼센트</Percent>
        <IssueInfo>
          <OpenIssue>열린이슈</OpenIssue>
          <CloseIssue>닫힌이슈</CloseIssue>
        </IssueInfo>
      </ChartInfo>
    </ChartBoxWrapper>
  );
};

const ChartBoxWrapper = styled.div`
  /* border: 1px solid black; */
`;
const ChartInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Chart = styled.div`
  margin: 10px 0;
  width: 200px;
  height: 5px;
  border: 1px solid black;
`;
const Percent = styled.div``;
const IssueInfo = styled.div`
  display: flex;
`;
const OpenIssue = styled.div``;
const CloseIssue = styled.div``;

export default ChartBox;
