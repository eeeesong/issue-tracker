import { atom } from "recoil";
interface IuserinfoAtom {
  profileUrl: string;
  loginID: string | null;
}
export const userInfoAtom = atom<IuserinfoAtom>({
  key: "userInfo",
  default: { profileUrl: "", loginID: "" },
});

export const currentIssueAtom = atom({
  key: "currentIssue",
  default: {},
});

export const LoginState = atom({
  key: "isLogin",
  default: false,
});
