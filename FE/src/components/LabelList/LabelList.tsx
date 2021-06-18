import { useState } from "react";
import { useRecoilValue } from "recoil";
import { labelCountSelector } from "atoms/atoms";
import styled from "styled-components";
import Tabs from "components/common/Tabs";
import AddButton from "components/common/AddButton";
import List from "./List";
import LabelModal from "./LabelModal";

const LabelList = () => {
  const [isAdding, setAdding] = useState(false);
  const labelCount = useRecoilValue(labelCountSelector);
  // fetch("http://3.34.122.67/api/labels")
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));
  console.log(localStorage.getItem("token"));
  return (
    <LabelListWrapper>
      <Tabs left={0} type="LABEL" />
      <AddButton text="추가" onClick={() => setAdding(true)} />
      {isAdding && (
        <LabelModal
          label={{
            id: labelCount + 1,
            name: "",
            content: "",
            color_code: "EFF0F6",
          }}
          type="ADD"
        />
      )}
      <List isAdding={isAdding} />
    </LabelListWrapper>
  );
};

const LabelListWrapper = styled.div`
  position: relative;
  width: 1280px;
`;

export default LabelList;
