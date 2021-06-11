import styled from "styled-components";
import Tabs from "components/common/Tabs"

const LabelList = () => {
  return (
    <LabelListWrapper>
      <Tabs type="LABEL"/>
    </LabelListWrapper>
  );
};

const LabelListWrapper = styled.div`
  position: relative;
  width: 1280px;
`;

export default LabelList;
