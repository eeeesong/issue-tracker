import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import styled from "styled-components";

interface ICommentModal {
  setEdit?: Dispatch<SetStateAction<boolean>>;
  body?: string;
}

const CommentModal = ({ setEdit, body }: ICommentModal) => {
  const [newBody, setBody] = useState(body || "");
  return (
    <CommentModalWrapper>
      <InBody placeholder="코멘트를 입력하세요" value={newBody} onChange={({ target }) => setBody(target.value)} />
      <Line />
      <Add>
        <AddInput type="file" />
        <AttachIcon />
        <AddText>파일 첨부하기</AddText>
      </Add>
      <Grip />
      <TotalCount>띄어쓰기 포함 {newBody.length}자</TotalCount>
      {setEdit ? (
        <>
          <CancelButton onClick={() => setEdit(false)} />
          <CompleteButton onClick={() => setEdit(false)} />
        </>
      ) : (
        <AddButton />
      )}
    </CommentModalWrapper>
  );
};

const AttachIcon = () => (
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

const CancelButton = ({ onClick }: { onClick: MouseEventHandler }) => (
  <CancelButtonWrapper onClick={onClick}>
    <CancelIcon />
    <CancelButtonText>편집 취소</CancelButtonText>
  </CancelButtonWrapper>
);

const CancelIcon = () => (
  <CancelIconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.7999 4.70026L5.20025 11.2999M5.2002 4.7002L11.7999 11.2999"
        stroke="#007AFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </CancelIconWrapper>
);

const CompleteButton = ({ onClick }: { onClick: MouseEventHandler }) => (
  <CompleteButtonWrapper onClick={onClick}>
    <CompleteIcon />
    <CompleteButtonText>편집 완료</CompleteButtonText>
  </CompleteButtonWrapper>
);

const CompleteIcon = () => (
  <CompleteIconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.8335 9.77317V13.3332C13.8335 13.6868 13.693 14.0259 13.443 14.276C13.1929 14.526 12.8538 14.6665 12.5002 14.6665H3.16683C2.81321 14.6665 2.47407 14.526 2.22402 14.276C1.97397 14.0259 1.8335 13.6868 1.8335 13.3332V3.99984C1.8335 3.64622 1.97397 3.30708 2.22402 3.05703C2.47407 2.80698 2.81321 2.6665 3.16683 2.6665H6.72683"
        stroke="#FEFEFE"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5002 1.3335L15.1668 4.00016L8.50016 10.6668H5.8335V8.00016L12.5002 1.3335Z"
        stroke="#FEFEFE"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </CompleteIconWrapper>
);

const AddButton = () => (
  <AddButtonWrapper>
    <AddIcon />
    <AddButtonText>코멘트 작성</AddButtonText>
  </AddButtonWrapper>
);

const AddIcon = () => (
  <AddIconWrapper>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3.3335V12.6668" stroke="#FEFEFE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.3335 8H12.6668" stroke="#FEFEFE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </AddIconWrapper>
);

const CommentModalWrapper = styled.div`
  position: relative;
  margin-top: 24px;
  margin-bottom: 80px;
  margin-left: 60px;
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
const CancelButtonWrapper = styled.div`
  position: absolute;
  width: 120px;
  height: 40px;
  right: 128px;
  top: 359px;
  background: #fefefe;
  border: 2px solid #007aff;
  box-sizing: border-box;
  border-radius: 11px;
  z-index: 1;
`;
const CancelIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 22.08%;
  right: 64.58%;
  top: 30%;
  bottom: 30%;
`;
const CancelButtonText = styled.div`
  position: absolute;
  width: 47px;
  height: 20px;
  left: 44.5px;
  top: 8px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #007aff;
`;
const CompleteButtonWrapper = styled.div`
  position: absolute;
  width: 120px;
  height: 40px;
  right: 0px;
  top: 359px;
  background: #007aff;
  border-radius: 11px;
`;
const CompleteIconWrapper = styled.div`
  position: absolute;
  left: 22.08%;
  right: 64.58%;
  top: 30%;
  bottom: 30%;
`;
const CompleteButtonText = styled.div`
  position: absolute;
  width: 47px;
  height: 20px;
  left: 46.5px;
  top: 10px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #fefefe;
`;
const AddButtonWrapper = styled.div`
  position: absolute;
  width: 120px;
  height: 40px;
  right: 0px;
  top: 359px;
  background: #007aff;
  border-radius: 11px;
`;
const AddIconWrapper = styled.div`
  position: absolute;
  left: 17.5%;
  right: 69.17%;
  top: 30%;
  bottom: 30%;
`;
const AddButtonText = styled.div`
  position: absolute;
  width: 58px;
  height: 20px;
  left: 41px;
  top: 10px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #fefefe;
`;

export default CommentModal;
