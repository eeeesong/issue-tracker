export interface IUser {
  name: string;
  image: string;
}

export interface ILabel {
  id: number;
  name: string;
  color_code: string;
}

export interface IComment {
  id: number;
  author: IUser;
  body: string;
  time: string;
}

export interface IMilestone {
  title: string;
} // 순환참조 문제 해결필요

export interface IIssue {
  id: number;
  title: string;
  body: string;
  label: Array<ILabel>;
  milestone: IMilestone;
  assignee: Array<IUser>;
  author: IUser;
  date: string;
  comments: Array<IComment>;
  status: boolean;
}
