import { issueListAtom } from "atoms/atoms";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "./Header";
import Issue from "./Issue";

const List = () => {
  const [isOpen, setOpen] = useState(true);
  const [checkedIndex, setCheckedIndex] = useState<Array<number>>([]);
  const issues = useRecoilValue(issueListAtom)
  const filteredIssue = issues.filter(({ status }) => status === isOpen);
  return (
    <ListWrapper>
      <Header
        isOpen={isOpen}
        setOpen={setOpen}
        count={{ open: issues.filter(({ status }) => status).length, close: issues.filter(({ status }) => !status).length }}
        filteredIndex={filteredIssue.map(({ id }) => id)}
        checkedIndex={checkedIndex}
        setCheckedIndex={setCheckedIndex}
      />
      {filteredIssue.map(({id}) => (
        <Issue key={id} id={id} checkedIndex={checkedIndex} setCheckedIndex={setCheckedIndex} />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  position: absolute;
  top: 64px;
  background: #d9dbe9;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
`;

export default List;
