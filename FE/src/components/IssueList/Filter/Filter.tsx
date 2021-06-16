import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import FilterInput from "./FilterInput";
import FilterPopUp from "./FilterPopUp";

const Filter = () => {
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
      <FilterInput />
      {isOn && <FilterPopUp />}
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
