import styled from "styled-components";
import Tabs from "components/common/Tabs";
import AddButton from "components/common/AddButton";

const Controller = () => {
  return (
    <ControllerWrapper>
      <Tabs type="ISSUE"/>
      <AddButton text="이슈 작성" />
    </ControllerWrapper>
  );
};

const ControllerWrapper = styled.div`
  position: absolute;
  left: 823px;
`;

export default Controller;
