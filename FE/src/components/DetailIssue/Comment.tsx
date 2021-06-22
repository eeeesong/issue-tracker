import { IComment, IUser } from "config/interface";
import { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import CommentModal from "./CommentModal";

interface ICommentComp {
  comment: IComment
  issueAuthor: IUser;
  close?: boolean;
}

const Comment = ({ close, comment, issueAuthor }: ICommentComp) => {
  const { author, created_date, description } = comment;
  const [isEdit, setEdit] = useState(false);
  return isEdit ? (
    <>
      <CommentModal setEdit={setEdit} body={description} />
    </>
  ) : (
    <CommentWrapper isClose={Boolean(close)}>
      <Title isClose={Boolean(close)}>
        <TitleText>
          <TitleTextAuthor>{author.name}</TitleTextAuthor>
          <TitleTextTime>{created_date}</TitleTextTime>
        </TitleText>
        {issueAuthor.name === author.name && <AuthorBadge />}
        {!close && <EditButton onClick={() => setEdit(true)} />}
        <EmojiIcon />
      </Title>
      <Body>{description}</Body>
    </CommentWrapper>
  );
};

const AuthorBadge = () => <AuthorBadgeWrapper>작성자</AuthorBadgeWrapper>;

const EditButton = ({ onClick }: { onClick: MouseEventHandler }) => (
  <EditButtonWrapper onClick={onClick}>
    <EditIcon />
    <EditButtonText>편집</EditButtonText>
  </EditButtonWrapper>
);

const EditIcon = () => (
  <EditIconWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3335 9.77317V13.3332C13.3335 13.6868 13.193 14.0259 12.943 14.276C12.6929 14.526 12.3538 14.6665 12.0002 14.6665H2.66683C2.31321 14.6665 1.97407 14.526 1.72402 14.276C1.47397 14.0259 1.3335 13.6868 1.3335 13.3332V3.99984C1.3335 3.64622 1.47397 3.30708 1.72402 3.05703C1.97407 2.80698 2.31321 2.6665 2.66683 2.6665H6.22683"
        stroke="#6E7191"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0002 1.3335L14.6668 4.00016L8.00016 10.6668H5.3335V8.00016L12.0002 1.3335Z"
        stroke="#6E7191"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </EditIconWrapper>
);

const EmojiIcon = () => (
  <EmojiIconWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00016 14.6668C11.6821 14.6668 14.6668 11.6821 14.6668 8.00016C14.6668 4.31826 11.6821 1.3335 8.00016 1.3335C4.31826 1.3335 1.3335 4.31826 1.3335 8.00016C1.3335 11.6821 4.31826 14.6668 8.00016 14.6668Z"
        stroke="#6E7191"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.3335 9.3335C5.3335 9.3335 6.3335 10.6668 8.00016 10.6668C9.66683 10.6668 10.6668 9.3335 10.6668 9.3335"
        stroke="#6E7191"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 6H6.00667" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6H10.0067" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </EmojiIconWrapper>
);

const CommentWrapper = styled.div<{ isClose: boolean }>`
  position: relative;
  width: 880px;
  height: 124px;
  margin-left: 60px;
  background: #fefefe;
  border: 1px solid;
  border-color: ${({ isClose }) => (isClose ? "#0025E7" : "#d9dbe9")};
  box-sizing: border-box;
  border-radius: 16px;
  & + & {
    margin-top: 24px;
  }
`;
const Title = styled.div<{ isClose: boolean }>`
  position: absolute;
  width: 878px;
  height: 64px;
  background: ${({ isClose }) => (isClose ? "#CCD4FF" : "#f7f7fc")};;
  border-bottom: 1px solid #d9dbe9;
  box-sizing: border-box;
  border-radius: 16px 16px 0px 0px;
`;
const TitleText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  left: 24px;
  top: 18px;
  font-size: 16px;
  line-height: 28px;
`;
const TitleTextAuthor = styled.div`
  color: #14142b;
`;
const TitleTextTime = styled.div`
  margin-left: 8px;
  color: #6e7191;
`;
const AuthorBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 66px;
  height: 24px;
  left: 687px;
  top: 20px;
  border: 1px solid #d9dbe9;
  box-sizing: border-box;
  border-radius: 30px;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #6e7191;
`;
const EditButtonWrapper = styled.div`
  position: absolute;
  width: 43px;
  height: 32px;
  left: 777px;
  top: 16px;
  border-radius: 20px;
`;
const EditIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0%;
  right: 62.79%;
  top: 25%;
  bottom: 25%;
`;
const EditButtonText = styled.div`
  position: absolute;
  width: 23px;
  height: 20px;
  left: 20px;
  top: 6px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #6e7191;
`;
const EmojiIconWrapper = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 840px;
  top: 24px;
`;
const Body = styled.div`
  position: absolute;
  height: 28px;
  left: 24px;
  top: 80px;
  font-size: 16px;
  line-height: 28px;
  color: #14142b;
`;

export default Comment;
