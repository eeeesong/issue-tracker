import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { currentIssueSelector } from "atoms/atoms";
import SideBar from "components/common/SideBar";
import Header from "./Header";
import Comment from "./Comment";
import CommentModal from "./CommentModal";

const DetailIssue = () => {
  const { author, comment, status } = useRecoilValue(currentIssueSelector);
  return (
    <DetailIssueWrapper>
      <Header />
      <Line />
      <Content>
        <SideBar isDetail />
        {comment.map((comment) => (
          <Comment key={comment.id} issueAuthor={author} comment={comment} />
        ))}
        {!status && (
          <Comment
            close
            comment={{id:comment.length+1, description: "이슈가 닫혔습니다", author: author, created_date: "" }}
            issueAuthor={author}
          />
        )}
        <CommentModal />
      </Content>
    </DetailIssueWrapper>
  );
};

const DetailIssueWrapper = styled.div`
  position: relative;
  width: 1280px;
`;
const Line = styled.div`
  position: relative;
  width: 1280px;
  height: 1px;
  margin-top: 32px;
  background: #d9dbe9;
  transform: matrix(1, 0, 0, -1, 0, 0);
`;
const Content = styled.div`
  position: relative;
  width: 1280px;
  margin-top: 32px;
`;

export default DetailIssue;
