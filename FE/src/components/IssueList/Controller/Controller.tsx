import styled from "styled-components";
import Tabs from "components/common/Tabs";
import AddButton from "./AddButton";

const Controller = () => {
  return (
    <ControllerWrapper>
      <Tabs type="ISSUE"/>
      <AddButton />
    </ControllerWrapper>
  );
};

const ControllerWrapper = styled.div`
  position: absolute;
  left: 823px;
`;

export default Controller;
