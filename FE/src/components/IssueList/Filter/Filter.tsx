import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import FilterInput from "./FilterInput";
import FilterPopUp from "./FilterPopUp";

const Filter = () => {
  const filterList = [
    {
      id: 0,
      title: "열린 이슈",
      body: "is:issue is:open",
    },
    {
      id: 1,
      title: "내가 작성한 이슈",
      body: "is:open is:issue author:@me",
    },
    {
      id: 2,
      title: "나에게 할당된 이슈",
      body: "is:open is:issue assignee:@me",
    },
    {
      id: 3,
      title: "내가 댓글을 남긴 이슈",
      body: "is:open is:issue comment:@me ",
    },
    {
      id: 4,
      title: "닫힌 이슈",
      body: "is:closed is:issue",
    },
  ];
  const [filterIndex, setfilterIndex] = useState(0);

  const [isOn, setOn] = useState(false);
  const currentDOM = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const blur = ({ target }: MouseEvent) => !currentDOM.current?.contains(target as HTMLDivElement) && setOn(false);
    document.addEventListener("click", blur);
    return () => document.removeEventListener("click", blur);
  });
  return (
    <FilterWrapper ref={currentDOM}>
      <FilterButton onClick={() => setOn((status) => !status)} />
      <FilterInput input={filterList[filterIndex].body} />
      {isOn && <FilterPopUp list={filterList} index={filterIndex} setIndex={setfilterIndex} />}
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  position: absolute;
  width: 601px;
  height: 40px;
  border: 1px solid #d9dbe9;
  border-radius: 11px;
`;

export default Filter;
