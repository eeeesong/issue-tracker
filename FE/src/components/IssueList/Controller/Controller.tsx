import styled from "styled-components";
import Tabs from "./Tabs";
import AddButton from "./AddButton";

const Controller = () => {
  return (
    <ControllerWrapper>
      <Tabs />
      <AddButton />
    </ControllerWrapper>
  );
};

const ControllerWrapper = styled.div`
  position: absolute;
  left: 823px;
`;

export default Controller;
