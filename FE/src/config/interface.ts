export interface IUser {
  loginId: string;
  profileUrl: string;
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
  id: number,
  title: string,
  due_date: string,
  description: string,
} 

export interface IIssue {
  id: number;
  title: string;
  body: string;
  label: Array<ILabel>;
  milestone: IMilestone|null;
  assignee: Array<IUser>;
  author: IUser;
  date: string;
  comments: Array<IComment>;
  status: boolean;
}
