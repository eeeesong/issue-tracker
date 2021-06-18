import { atom, selector } from "recoil";

interface IuserinfoAtom {
  profileUrl: string;
  loginID: string | null;
}

export const userInfoAtom = atom<IuserinfoAtom>({
  key: "userInfo",
  default: { profileUrl: "", loginID: "" },
});

export const issueListAtom = atom({
  key: "issueList",
  default: [
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
      comments: [
        {
          id: 1,
          author: { name: "Seong", image: "대충 src" },
          body: "대충 아무내용",
          time: "대충년원일",
        },
        {
          id: 2,
          author: { name: "Luke", image: "대충 src" },
          body: "아무내용",
          time: "대충년원일",
        },
      ],
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
      label: [
        { id: 3, name: "test2", color_code: "AAAAAA" },
        { id: 4, name: "test3", color_code: "999999" },
        { id: 5, name: "test4", color_code: "EE99AA" },
      ],
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
  ],
});

export const currentIssueIdAtom = atom({
  key: "currentIssueId",
  default: 1,
});

export const currentIssueSelector = selector({
  key: "currentIssue",
  get({ get }) {
    return get(issueListAtom).filter(
      ({ id }) => id === get(currentIssueIdAtom)
    )[0];
  },
});

export const labelListAtom = atom({
  key: "labelList",
  default: [
    {
      id: 1,
      name: "documentation",
      content: "문서 관련",
      color_code: "004de3",
    },
    { id: 2, name: "test", content: "색테스트", color_code: "FF0000" },
    {
      id: 3,
      name: "test2",
      content: "글자색 반응 테스트",
      color_code: "AAAAAA",
    },
    {
      id: 4,
      name: "test3",
      content: "글자색 반응 테스트",
      color_code: "999999",
    },
    {
      id: 5,
      name: "test4",
      content: "글자색 반응 테스트",
      color_code: "EE99AA",
    },
  ],
});

export const labelCountSelector = selector({
  key: "labelCount",
  get({ get }) {
    return get(labelListAtom).length;
  },
});

export const milestoneListAtom = atom({
  key: "milestoneList",
  default: [
    {
      id: 1,
      title: "마일스톤 제목 1",
      date: "6/10",
      detail: "설명1",
    },
    {
      id: 2,
      title: "마일스톤 제목 2",
      date: "6/11",
      detail: "설명2",
    },
    {
      id: 3,
      title: "마일스톤 제목 3",
      date: "6/12",
      detail: "설명3",
    },
  ],
});

export const milestoneCountSelector = selector({
  key: "milestoneCount",
  get({ get }) {
    return get(milestoneListAtom).length;
  },
});

export const LoginState = atom({
  key: "isLogin",
  default: false,
});
