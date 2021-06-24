import styled from "styled-components";

const MilestoneBar = () => {
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
  width: 300px;
  height: 10px;
  border-radius: 10px;
  background-color: #eff0f6;
  /* border: 1px solid black; */
  display: flex;
`;

export default MilestoneBar;
