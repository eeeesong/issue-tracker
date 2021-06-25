import { IIssue, IUser } from "config/interface";
import { atom, selector } from "recoil";

export const userInfoAtom = atom<IUser>({
  key: "userInfo",
  default: { id: 0, imageUrl: "", name: "" },
});

export const issueListAtom = atom<Array<IIssue>>({
  key: "issueList",
  default: [],
});

export const currentIssueIdAtom = atom({
  key: "currentIssueId",
  default: 1,
});

export const currentIssueSelector = selector({
  key: "currentIssue",
  get({ get }) {
    return get(issueListAtom).filter(({ issueNumber }) => issueNumber === get(currentIssueIdAtom))[0];
  },
});

export const checkedIssueIdAtom = atom<Array<number>>({
  key: "checkedIssueId",
  default: [],
});

export const labelListAtom = atom({
  key: "labelList",
  default: [
    {
      id: 1,
      name: "documentation",
      content: "문서 관련",
      color_code: "#004de3",
    },
    { id: 2, name: "test", content: "색테스트", color_code: "#FF0000" },
    {
      id: 3,
      name: "test2",
      content: "글자색 반응 테스트",
      color_code: "#AAAAAA",
    },
    {
      id: 4,
      name: "test3",
      content: "글자색 반응 테스트",
      color_code: "#999999",
    },
    {
      id: 5,
      name: "test4",
      content: "글자색 반응 테스트",
      color_code: "#EE99AA",
    },
  ],
});

export const labelCountSelector = selector({
  key: "labelCount",
  get({ get }) {
    return get(labelListAtom).length;
  },
});

export const milestoneListAtom = atom<Array<IMilestone>>({
  key: "milestoneList",
  default: [],
});

export const milestoneInputAtom = atom({
  key: "milestoneInput",
  default: {
    title: "",
    due_date: "",
    description: "",
  },
});

export const IssueDetailAtom = atom({
  key: "IssueDetail",
  default: {
    data: {
      id: 4,
      title: "코드스쿼드 과정",
      description: "얼마 안남았다 ㅜㅜ",
      issueResponses: [
        {
          issueNumber: 2,
          title: "[BE] Issue 등록",
          status: false,
          author: {
            id: 5,
            name: "Starve",
            imageUrl: "https://avatars.githubusercontent.com/u/69128652?v=4",
          },
          assignees: [
            {
              id: 1,
              name: "JINSEO PARK",
              imageUrl: "https://avatars.githubusercontent.com/u/52390975?v=4",
            },
          ],
          labels: [
            {
              id: 1,
              name: "documentation",
              color_code: "#84e6b1",
            },
          ],
          created_date: "2021-06-22 07:21",
        },
      ],
      due_date: "2021-06-25 18:00",
    },
    error: null,
  },
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
    logic: (arr: Array<IIssue>, user: IUser) =>
      arr.filter(({ author }) => author.loginId === user.loginId),
  },
  {
    id: 2,
    body: "is:issue assignee:@me",
    logic: (arr: Array<IIssue>, user: IUser) =>
      arr.filter(
        ({ assignee }) =>
          assignee.filter(({ loginId }) => loginId === user.loginId).length !==
          0
      ),
  },
  {
    id: 3,
    body: "is:issue comment:@me ",
    logic: (arr: Array<IIssue>, user: IUser) =>
      arr.filter(
        ({ comments }) =>
          comments.filter(({ author }) => author.loginId === user.loginId)
            .length !== 0
      ),
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
    return filter[get(filterIndexAtom)].logic(
      get(issueListAtom),
      get(userInfoAtom)
    );
  },
});

export const currentFilterBodySelector = selector({
  key: "currentFilterBody",
  get({ get }) {
    return `is:${get(openFilterAtom) ? "open" : "close"} ${
      filter[get(filterIndexAtom)].body
    }`;
  },
});
