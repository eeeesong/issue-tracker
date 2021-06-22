import { IIssue, IUser } from "config/interface";
import { atom, selector } from "recoil";


export const userInfoAtom = atom<IUser>({
  key: "userInfo",
  default: { profileUrl: "", loginId: "" },
});

export const issueListAtom = atom<Array<IIssue>>({
  key: "issueList",
  default: [
    {
      id: 1,
      title: "FE 이슈트래커 개발",
      body: "김수한무거북이와두루미삼천갑자동방삭",
      label: [
        { id: 1, name: "documentation", color_code: "#004de3" },
        { id: 2, name: "test", color_code: "#FF0000" },
      ],
      milestone: { title: "마스터즈 코스" },
      assignee: [
        { loginId: "GleamingStar", profileUrl: "대충 src" },
        { loginId: "Luke", profileUrl: "대충 src" },
      ],
      author: { loginId: "GleamingStar", profileUrl: "대충 src" },
      date: "대충년월일",
      comments: [
        {
          id: 1,
          author: { loginId: "GleamingStar", profileUrl: "대충 src" },
          body: "대충 아무내용",
          time: "대충년원일",
        },
        {
          id: 2,
          author: { loginId: "Luke", profileUrl: "대충 src" },
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
      label: [{ id: 2, name: "test", color_code: "#FF0000" }],
      milestone: { title: "마스터즈 코스" },
      assignee: [{ loginId: "GleamingStar", profileUrl: "대충 src" }],
      author: { loginId: "GleamingStar", profileUrl: "대충 src" },
      date: "대충년월일",
      comments: [],
      status: true,
    },
    {
      id: 3,
      title: "천천히",
      body: "8749382",
      label: [
        { id: 3, name: "test2", color_code: "#AAAAAA" },
        { id: 4, name: "test3", color_code: "#999999" },
        { id: 5, name: "test4", color_code: "#EE99AA" },
      ],
      milestone: null,
      assignee: [{ loginId: "GleamingStar", profileUrl: "대충 src" }],
      author: { loginId: "GleamingStar", profileUrl: "대충 src" },
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
      assignee: [{ loginId: "GleamingStar", profileUrl: "대충 src" }],
      author: { loginId: "GleamingStar", profileUrl: "대충 src" },
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
      assignee: [{ loginId: "GleamingStar", profileUrl: "대충 src" }],
      author: { loginId: "GleamingStar", profileUrl: "대충 src" },
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
      assignee: [{ loginId: "GleamingStar", profileUrl: "대충 src" }],
      author: { loginId: "Luke", profileUrl: "대충 src" },
      date: "대충년월일",
      comments: [],
      status: true,
    },
    {
      id: 7,
      title: "개수테스트",
      body: "382",
      label: [{ id: 2, name: "test", color_code: "#FF0000" }],
      milestone: { title: "마스터즈 코스" },
      assignee: [{ loginId: "GleamingStar", profileUrl: "대충 src" }],
      author: { loginId: "Luke", profileUrl: "대충 src" },
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
    return get(issueListAtom).filter(({ id }) => id === get(currentIssueIdAtom))[0];
  },
});

export const labelListAtom = atom({
  key: "labelList",
  default: [
    { id: 1, name: "documentation", content: "문서 관련", color_code: "#004de3" },
    { id: 2, name: "test", content: "색테스트", color_code: "#FF0000" },
    { id: 3, name: "test2", content: "글자색 반응 테스트", color_code: "#AAAAAA" },
    { id: 4, name: "test3", content: "글자색 반응 테스트", color_code: "#999999" },
    { id: 5, name: "test4", content: "글자색 반응 테스트", color_code: "#EE99AA" },
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
  default: [{ title: "마스터즈 코스" }],
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

const filter = [
  {
    id: 0,
    body: "is:issue",
    logic: (arr: Array<IIssue>, user: IUser) => arr,
  },
  {
    id: 1,
    body: "is:issue author:@me",
    logic: (arr: Array<IIssue>, user: IUser) => arr.filter(({ author }) => author.loginId === user.loginId),
  },
  {
    id: 2,
    body: "is:issue assignee:@me",
    logic: (arr: Array<IIssue>, user: IUser) =>
      arr.filter(({ assignee }) => assignee.filter(({ loginId }) => loginId === user.loginId).length !== 0),
  },
  {
    id: 3,
    body: "is:issue comment:@me ",
    logic: (arr: Array<IIssue>, user: IUser) =>
      arr.filter(({ comments }) => comments.filter(({ author }) => author.loginId === user.loginId).length !== 0),
  },
];

export const openFilterAtom = atom({
  key: "openFilter",
  default: true,
});

export const filterIndexAtom = atom({
  key: "filterIndex",
  default: 0,
});

export const currentFilterSelector = selector({
  key: "currentFilter",
  get({ get }) {
    return filter[get(filterIndexAtom)].logic(get(issueListAtom),get(userInfoAtom));
  },
});

export const currentFilterBodySelector = selector({
  key: "currentFilterBody",
  get({ get }) {
    return `is:${get(openFilterAtom) ? "open" : "close"} ${filter[get(filterIndexAtom)].body}`;
  },
});
