import { milestoneListAtom } from "atoms/atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const MilestoneModal = () => {
  const milestoneList = useRecoilValue(milestoneListAtom);
  const milestoneTitle = milestoneList.map((e) => (
    <MilestoneTitle>{e.title}</MilestoneTitle>
  ));
  return (
    <MilestoneModalWrapper onClick={(e) => e.stopPropagation()}>
      <Title>Set Milestone</Title>
      <ClearMilestone>Clear this milestone</ClearMilestone>
      {milestoneTitle}
    </MilestoneModalWrapper>
  );
};
const ListStyle = styled.div`
  border-bottom: 1px solid#d9dbe9;
  padding: 10px;
`;
const Title = styled(ListStyle)`
  font-size: 23px;
  font-weight: 500;
`;
const ClearMilestone = styled(ListStyle)`
  &:hover {
    background-color: red;
  }
`;
const MilestoneTitle = styled(ListStyle)`
  &:hover {
    background-color: #d9dbe9;
  }
  &:nth-last-child(1) {
    border: none;
  }
`;
const MilestoneModalWrapper = styled.div`
  border-radius: 20px;
  border: 1px solid #d9dbe9;
  position: absolute;
  width: 310px;
  left: -1px;
  background-color: white;
  /* z-index: 3; */
`;
export default MilestoneModal;
