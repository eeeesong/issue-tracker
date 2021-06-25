import styled from "styled-components";
import { useEffect, useState } from "react";
import { IIssue } from "config/interface";
// import MilestoneBar from "components/common/MilestoneBar";
const ChartBox = ({ infoIndex }: { infoIndex: number }) => {
  const [milestoneDetail, setMilestoneDetail] = useState({ max: 0, value: 0 });
  useEffect(() => {
    const getData = async () => {
      const responceGet = await fetch(
        `http://3.34.122.67/api/milestones/${3}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = await responceGet.json();
      console.log(data);
      const issues: Array<IIssue> = data.issueResponses;
      console.log(issues.length);
      console.log(issues.filter(({ status }) => !status).length);
      setMilestoneDetail({
        max: issues.length,
        value: issues.filter(({ status }) => !status).length,
      });
    };
    getData();
  }, []);
  return (
    <ChartBoxWrapper>
      <MilestoneBar max={milestoneDetail.max} value={milestoneDetail.value} />
      <IssueInfo>
        <OpenIssue>열린이슈</OpenIssue>
        <CloseIssue>닫힌이슈</CloseIssue>
      </IssueInfo>
    </ChartBoxWrapper>
  );
};
const MilestoneBar = styled.progress``;
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
