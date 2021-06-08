import styled from "styled-components";

interface IIssue {
  id: number;
  title: string;
  body: string;
  label: Array<any>;
  milestone: any;
  assignee: Array<any>;
  author: any;
  date: string;
  comments: Array<any>;
  status: boolean;
}

const Issue = ({ content }: { content: IIssue }) => {
  return <IssueWrapper></IssueWrapper>;
};

const IssueWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 100px;
  background: #fefefe;
  margin-top: 1px;
  &:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;

export default Issue;
