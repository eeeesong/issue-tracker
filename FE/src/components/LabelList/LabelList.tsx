import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { labelListAtom } from "atoms/atoms";
import styled from "styled-components";
import Tabs from "components/common/Tabs";
import AddButton from "components/common/AddButton";
import List from "./List";
import LabelModal from "./LabelModal";

const LabelList = () => {
  const [isAdding, setAdding] = useState(false);
  const [, setLabelList] = useRecoilState(labelListAtom);
  useEffect(() => {
    fetch(`http://3.34.122.67/api/labels`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => res.json())
      .then((json) => setLabelList(json.data));
  }, [setLabelList]);
  return (
    <LabelListWrapper>
      <Tabs left={0} type="LABEL" />
      <AddButton text="추가" onClick={() => setAdding(true)} />
      {isAdding && <LabelModal label={{ id: 0, name: "", content: "", color_code: "#EFF0F6" }} type="ADD" setAdding={setAdding} />}

      <List isAdding={isAdding} />
    </LabelListWrapper>
  );
};

const LabelListWrapper = styled.div`
  position: relative;
  width: 1280px;
`;

export default LabelList;
