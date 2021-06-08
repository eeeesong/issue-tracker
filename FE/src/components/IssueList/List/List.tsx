import styled from "styled-components";
import Header from "./Header";
import Issue from "./Issue";

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

const issues: Array<IIssue> = [
  {
    id: 1,
    title: "FE 이슈트래커 개발",
    body: "김수한무거북이와두루미삼천갑자동방삭",
    label: [{ title: "documentation", color: "#FFFFFF" }],
    milestone: { title: "마스터즈 코스" },
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Seong", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: true,
  },
  {
    id: 2,
    title: "개발은 천천히",
    body: "398749382",
    label: [],
    milestone: { title: "마스터즈 코스" },
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Seong", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: true,
  },
];

const List = () => {
  return (
    <ListWrapper>
      <Header />
      {issues.map((issue) => (
        <Issue content={issue} />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  position: absolute;
  top: 64px;
  background: #D9DBE9;
border: 1px solid #D9DBE9;
border-radius: 16px;
`;

export default List;
