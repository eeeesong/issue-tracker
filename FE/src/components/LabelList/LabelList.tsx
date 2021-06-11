import styled from "styled-components";
import Tabs from "components/common/Tabs"
import AddButton from "components/common/AddButton";
import List from "./List"

const LabelList = () => {
  return (
    <LabelListWrapper>
      <Tabs left={0} type="LABEL"/>
      <AddButton text="추가"/>
      <List />
    </LabelListWrapper>
  );
};

const LabelListWrapper = styled.div`
  position: relative;
  width: 1280px;
`;

export default LabelList;
