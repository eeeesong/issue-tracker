import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Issue from "./Issue";

interface IUser {
  name: string;
  image: string;
}

interface ILabel {
  id: number;
  name: string;
  color_code: string;
}
interface IIssue {
  id: number;
  title: string;
  body: string;
  label: Array<ILabel>;
  milestone: { title: string } | null;
  assignee: Array<IUser>;
  author: IUser;
  date: string;
  comments: Array<any>;
  status: boolean;
}

const issues: Array<IIssue> = [
  {
    id: 1,
    title: "FE 이슈트래커 개발",
    body: "김수한무거북이와두루미삼천갑자동방삭",
    label: [
      { id: 1, name: "documentation", color_code: "004de3" },
      { id: 2, name: "test", color_code: "FF0000" },
    ],
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
    label: [{ id: 2, name: "test", color_code: "FF0000" }],
    milestone: { title: "마스터즈 코스" },
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Seong", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: true,
  },
  {
    id: 3,
    title: "천천히",
    body: "8749382",
    label: [{id:3, name:"test2", color_code:"AAAAAA"},{id:4, name:"test3", color_code:"999999"},{id:5, name:"test4", color_code:"EE99AA"}],
    milestone: null,
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Seong", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: true,
  },
  {
    id: 4,
    title: "천천히?",
    body: "87493",
    label: [],
    milestone: null,
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Seong", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: false,
  },
  {
    id: 5,
    title: "천",
    body: "382",
    label: [],
    milestone: null,
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Seong", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: false,
  },
  {
    id: 6,
    title: "개수테스트",
    body: "382",
    label: [],
    milestone: null,
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Luke", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: true,
  },
  {
    id: 7,
    title: "개수테스트",
    body: "382",
    label: [{ id: 2, name: "test", color_code: "FF0000" }],
    milestone: { title: "마스터즈 코스" },
    assignee: [{ name: "Seong", image: "대충 src" }],
    author: { name: "Luke", image: "대충 src" },
    date: "대충년월일",
    comments: [],
    status: false,
  },
];

const List = () => {
  const [isOpen, setOpen] = useState(true);
  const [checkedIndex, setCheckedIndex] = useState<Array<number>>([]);
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
      {filteredIssue.map((issue) => (
        <Issue key={issue.id} content={issue} checkedIndex={checkedIndex} setCheckedIndex={setCheckedIndex} />
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
