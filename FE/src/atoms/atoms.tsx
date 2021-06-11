import { atom } from "recoil";

export const userInfoAtom = atom({
  key: "userInfo",
  default: {},
});

export const currentIssueAtom = atom({
  key: "currentIssue",
  default: {},
});

export const LoginState = atom({
  key: "isLogin",
  default: false,
});
