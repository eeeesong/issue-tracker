import styled from "styled-components";
import Tabs from "components/common/Tabs";
import AddButton from "components/common/AddButton";
import { useState } from "react";
import MilestoneModal from "./MilestoneModal";
import List from "./List";

const Milestoneist = () => {
  const [isAdding, setAdding] = useState(false);
  return (
    <MilestoneistWrapper>
      <Tabs left={0} type="MILESTONE" />
      <AddButton text="추가" onClick={() => setAdding(true)} />
      {isAdding && <MilestoneModal />}
      <List isAdding={isAdding} />
    </MilestoneistWrapper>
  );
};

const MilestoneistWrapper = styled.div`
  position: relative;
  width: 1280px;
`;

export default Milestoneist;
