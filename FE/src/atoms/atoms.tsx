import { atom, selector } from "recoil";

export const userInfoAtom = atom({
  key: "userInfo",
  default: {
    profileUrl: "",
  },
});

export const currentIssueAtom = atom({
  key: "currentIssue",
  default: {},
});

export const labelListAtom = atom({
  key: "labelList",
  default: [
    { id: 1, name: "documentation", content: "문서 관련", color_code: "004de3" },
    { id: 2, name: "test", content: "색테스트", color_code: "FF0000" },
    { id: 3, name: "test2", content: "글자색 반응 테스트", color_code: "AAAAAA" },
    { id: 4, name: "test3", content: "글자색 반응 테스트", color_code: "999999" },
    { id: 5, name: "test4", content: "글자색 반응 테스트", color_code: "EE99AA" },
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
