import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import SideBar from "components/common/SideBar";

interface IContent {
  title: string;
  body: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setBody: Dispatch<SetStateAction<string>>;
}

const Content = (props: IContent) => {
  const { title, body, setTitle, setBody } = props;
  const titleChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setTitle(target.value);
  const bodyChangeHandler = ({ target }: ChangeEvent<HTMLTextAreaElement>) => setBody(target.value);
  return (
    <ContentWrapper>
      <Title placeholder="제목" value={title} onChange={titleChangeHandler} />
      <Body>
        <InBody placeholder="코멘트를 입력하세요" value={body} onChange={bodyChangeHandler} />
        <Line />
        <Add>
          <AddInput type="file" />
          <AddIcon />
          <AddText>파일 첨부하기</AddText>
        </Add>
        <Grip />
        <TotalCount>띄어쓰기 포함 {body.length}자</TotalCount>
      </Body>
      <SideBar />
    </ContentWrapper>
  );
};

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.2933 7.36678L8.16665 13.4934C7.41609 14.244 6.39811 14.6657 5.33665 14.6657C4.2752 14.6657 3.25721 14.244 2.50665 13.4934C1.75609 12.7429 1.33443 11.7249 1.33443 10.6634C1.33443 9.60199 1.75609 8.584 2.50665 7.83344L8.63332 1.70678C9.13369 1.2064 9.81235 0.925293 10.52 0.925293C11.2276 0.925293 11.9063 1.2064 12.4067 1.70678C12.907 2.20715 13.1881 2.8858 13.1881 3.59344C13.1881 4.30108 12.907 4.97973 12.4067 5.48011L6.27332 11.6068C6.02313 11.857 5.6838 11.9975 5.32998 11.9975C4.97617 11.9975 4.63684 11.857 4.38665 11.6068C4.13646 11.3566 3.99591 11.0173 3.99591 10.6634C3.99591 10.3096 4.13646 9.9703 4.38665 9.72011L10.0467 4.06678"
      stroke="#6E7191"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Grip = () => (
  <GripWrapper>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17L17 9" stroke="#A0A3BD" />
      <path d="M1 17L17 1" stroke="#A0A3BD" />
    </svg>
  </GripWrapper>
);

const ContentWrapper = styled.div`
  position: relative;
  margin-left: 60px;
`;
const Title = styled.input`
  position: relative;
  margin-top: 32px;
  padding: 0px 24px;
  width: 832px;
  height: 56px;
  background: #eff0f6;
  border-radius: 14px;
  border: none;
  font-family: Noto Sans KR;
  font-size: 16px;
  line-height: 28px;
  color: #14142b;
`;
const Body = styled.div`
  position: relative;
  margin-top: 16px;
  padding: 16px 24px;
  width: 832px;
  min-height: 311px;
  background: #eff0f6;
  border-radius: 16px;
  border: none;
`;
const InBody = styled.textarea`
  all: unset;
  border: none;
  width: 832px;
  min-height: 253px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #14142b;
`;
const Line = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 84.84%;
  bottom: 15.16%;
  border: 1px dashed #d9dbe9;
`;
const Add = styled.div`
  padding: 0px;
  position: absolute;
  left: 24px;
  top: 307px;
`;
const AddInput = styled.input`
  position: absolute;
  width: 93px;
  height: 20px;
  opacity: 0;
  z-index: 1;
`;
const AddText = styled.div`
  position: absolute;
  width: 69px;
  height: 20px;
  left: 24px;
  top: 0px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #6e7191;
`;
const GripWrapper = styled.div`
  position: absolute;
  left: 854px;
  top: 265px;
`;
const TotalCount = styled.div`
  position: absolute;
  right: 30px;
  top: 251px;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #6e7191;
`;

export default Content;
