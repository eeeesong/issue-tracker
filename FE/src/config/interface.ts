export interface IUser {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ILabel {
  id: number;
  name: string;
  color_code: string;
}

export interface IComment {
  id: number;
  author: IUser;
  description: string;
  created_date: string;
}

export interface IMilestone {
  id:number;
  title: string;
}

export interface IIssue {
  issueNumber: number;
  title: string;
  labels: Array<ILabel>;
  milestone: IMilestone | null;
  assignees: Array<IUser>;
  author: IUser;
  created_date: string;
  comment: Array<IComment>;
  status: boolean;
}
