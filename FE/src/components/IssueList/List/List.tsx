import { currentFilterSelector, issueListAtom, openFilterAtom } from "atoms/atoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "./Header";
import Issue from "./Issue";

const List = () => {
  const isOpen = useRecoilValue(openFilterAtom);
  const issues = useRecoilValue(currentFilterSelector);

  const [, setIssueList] = useRecoilState(issueListAtom);
  useEffect(() => {
    fetch(`http://3.34.122.67/api/issues/all`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((json) => setIssueList(json.data));
  }, [setIssueList]);

  const filteredIssue = issues.filter(({ status }) => status === isOpen);
  return (
    <ListWrapper>
      <Header
        count={{
          open: issues.filter(({ status }) => status).length,
          close: issues.filter(({ status }) => !status).length,
        }}
        filteredIndex={filteredIssue.map(({ issueNumber }) => issueNumber)}
      />
      {filteredIssue.map(({ issueNumber }) => (
        <Issue key={issueNumber} id={issueNumber} />
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
