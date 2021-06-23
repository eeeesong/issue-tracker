import styled from "styled-components";
import Tabs from "components/common/Tabs";
import AddButton from "components/common/AddButton";
import { useState } from "react";
import MilestoneModal from "./MilestoneModal";
import List from "./List";

const Milestoneist = () => {
  const [isOpen, setOpen] = useState(false);
  const createBtnText = () => {
    if (isOpen) return "닫기";
    else return "추가";
  };
  return (
    <MilestoneistWrapper>
      <Tabs left={0} type="MILESTONE" />
      <AddButton
        isOpen={isOpen}
        text={createBtnText()}
        onClick={() => setOpen(() => !isOpen)}
      />
      {isOpen && <MilestoneModal />}
      <List isOpen={isOpen} />
    </MilestoneistWrapper>
  );
};

const MilestoneistWrapper = styled.div`
  position: relative;
  width: 1280px;
`;

export default Milestoneist;
