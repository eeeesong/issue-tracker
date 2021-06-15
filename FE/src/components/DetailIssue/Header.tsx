import { currentIssueSelector } from "atoms/atoms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Header = () => {
  const { id, title, author, date, comments, status } = useRecoilValue(currentIssueSelector);

  const [isEdit, setEdit] = useState(false);

  // 임시 목데이터 : 편집은 PATCH와 res를 통해
  const [newTitle, setTitle] = useState("FE 이슈트래커 디자인 시스템 구현");
  const [newStatus, setStatus] = useState(true); // true : open, false: closed
  const [inputTitle, setInputTitle] = useState(title);
  useEffect(() => {
    setTitle(title);
    setStatus(status);
  }, [id, status, title]);

  const editCancelEvent = () => {
    setInputTitle(newTitle);
    setEdit(false);
  };
  const editCompleteEvent = () => {
    setTitle(inputTitle);
    setEdit(false);
  };

  return (
    <HeaderWrapper>
      {isEdit ? (
        <TitleEdit>
          <TitleEditText>제목</TitleEditText>
          <TitleEditInput value={inputTitle} onChange={({ target }) => setInputTitle(target.value)} />
        </TitleEdit>
      ) : (
        <Title>
          <TitleText>{newTitle}</TitleText>
          <TitleNumber>#{id}</TitleNumber>
        </Title>
      )}
      <IssueLabel status={newStatus}>
        <IssueIcon status={newStatus} />
        <IssueLabelText>{newStatus ? "열린 이슈" : "닫힌 이슈"}</IssueLabelText>
      </IssueLabel>
      <Description>{`이 이슈가 ${date}에 ${author.name}님에 의해 열렸습니다 ∙ 코멘트 ${comments.length}개`}</Description>
      <EditButton onClick={isEdit ? editCancelEvent : () => setEdit(true)}>
        {isEdit ? <CancelIcon /> : <EditIcon />}
        <ButtonText>{isEdit ? "편집 취소" : "제목 편집"}</ButtonText>
      </EditButton>
      {isEdit ? (
        <CompleteButton onClick={editCompleteEvent}>
          <EditIcon reverse />
          <ButtonText reverse>편집 완료</ButtonText>
        </CompleteButton>
      ) : (
        <CloseButton onClick={() => setStatus((status) => !status)}>
          {newStatus ? <CloseIcon /> : <OpenIcon />}
          <ButtonText>{newStatus ? "이슈 닫기" : "다시 열기"}</ButtonText>
        </CloseButton>
      )}
    </HeaderWrapper>
  );
};

const IssueIcon = ({ status }: { status: boolean }) => (
  <IssueIconWrapper>
    {status ? (
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path
            d="M8.5 14.6668C12.1819 14.6668 15.1667 11.6821 15.1667 8.00016C15.1667 4.31826 12.1819 1.3335 8.5 1.3335C4.8181 1.3335 1.83334 4.31826 1.83334 8.00016C1.83334 11.6821 4.8181 14.6668 8.5 14.6668Z"
            stroke="#007AFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8.5 5.3335V8.00016" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M8.5 10.6665H8.50667"
            stroke="#007AFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="16" height="16" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    ) : (
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path
            d="M14.5 5.3335V14.0002H2.5V5.3335"
            stroke="#0025E7"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.8332 2H1.1665V5.33333H15.8332V2Z"
            stroke="#0025E7"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M7.1665 8H9.83317" stroke="#0025E7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="16" height="16" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    )}
  </IssueIconWrapper>
);

const EditIcon = ({ reverse }: { reverse?: boolean }) => (
  <IconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.8334 9.77317V13.3332C13.8334 13.6868 13.6929 14.0259 13.4428 14.276C13.1928 14.526 12.8537 14.6665 12.5 14.6665H3.16671C2.81309 14.6665 2.47395 14.526 2.2239 14.276C1.97385 14.0259 1.83337 13.6868 1.83337 13.3332V3.99984C1.83337 3.64622 1.97385 3.30708 2.2239 3.05703C2.47395 2.80698 2.81309 2.6665 3.16671 2.6665H6.72671"
        stroke={reverse ? "#FEFEFE" : "#007AFF"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 1.3335L15.1667 4.00016L8.50004 10.6668H5.83337V8.00016L12.5 1.3335Z"
        stroke={reverse ? "#FEFEFE" : "#007AFF"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);
const CloseIcon = () => (
  <IconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M14.5 5.3335V14.0002H2.5V5.3335"
          stroke="#007AFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.8332 2H1.1665V5.33333H15.8332V2Z"
          stroke="#007AFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7.1665 8H9.83317" stroke="#007AFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  </IconWrapper>
);
const OpenIcon = () => (
  <IconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M8.50016 14.6668C12.1821 14.6668 15.1668 11.6821 15.1668 8.00016C15.1668 4.31826 12.1821 1.3335 8.50016 1.3335C4.81826 1.3335 1.8335 4.31826 1.8335 8.00016C1.8335 11.6821 4.81826 14.6668 8.50016 14.6668Z"
          stroke="#007AFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.5 5.3335V8.00016" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 10.6665H8.50667" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  </IconWrapper>
);
const CancelIcon = () => (
  <IconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.7999 4.70026L5.20025 11.2999M5.2002 4.7002L11.7999 11.2999"
        stroke="#007AFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

const HeaderWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 104px;
`;
const Title = styled.div`
  position: absolute;
  display: flex;
  height: 48px;
  font-size: 32px;
  line-height: 48px;
`;
const TitleText = styled.div`
  color: #14142b;
`;
const TitleNumber = styled.div`
  margin-left: 16px;
  color: #6e7191;
`;
const TitleEdit = styled.div`
  position: absolute;
  width: 940px;
  height: 40px;
  left: 0px;
  top: 4px;
  background: #eff0f6;
  border-radius: 11px;
`;
const TitleEditText = styled.div`
  position: absolute;
  width: 80px;
  height: 40px;
  left: 24px;
  top: 0px;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #6e7191;
`;
const TitleEditInput = styled.input`
  all: unset;
  position: absolute;
  width: 804px;
  height: 40px;
  left: 112px;
  top: 0px;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  color: #14142b;
`;
const IssueLabel = styled.div<{ status: boolean }>`
  position: absolute;
  width: 100px;
  height: 40px;
  top: 64px;
  background: ${({ status }) => (status ? "#C7EBFF" : "#ccd4ff")};
  border: 1px solid;
  border-color: ${({ status }) => (status ? "#007AFF" : "#0025e7")};
  color: ${({ status }) => (status ? "#007AFF" : "#0025e7")};
  box-sizing: border-box;
  border-radius: 30px;
`;
const IssueLabelText = styled.div`
  position: absolute;
  left: 36.5px;
  top: 10px;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
`;
const IssueIconWrapper = styled.div`
  position: absolute;
  left: 16.5%;
  right: 67.5%;
  top: 30%;
  bottom: 30%;
`;
const Description = styled.div`
  position: absolute;
  left: 108px;
  top: 68px;
  font-size: 18px;
  line-height: 32px;
  color: #4e4b66;
`;
const EditButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  right: 132px;
  top: 4px;
  background: #fefefe;
  border: 2px solid #007aff;
  border-radius: 11px;
`;
const CloseButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  right: 0px;
  top: 4px;
  background: #fefefe;
  border: 2px solid #007aff;
  border-radius: 11px;
`;
const CompleteButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  right: 0px;
  top: 4px;
  background: #007aff;
  border: 2px solid #007aff;
  border-radius: 11px;
`;
const IconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.div<{ reverse?: boolean }>`
  margin-left: 4px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #007aff;
  color: ${({ reverse }) => (reverse ? "#FEFEFE" : "#007AFF")};
`;

export default Header;
