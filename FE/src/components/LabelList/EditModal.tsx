import styled from "styled-components";
import Label from "components/common/Label";
import { Dispatch, MouseEventHandler, useEffect, useState } from "react";

const EditModal = ({ label, setEdit }: { label: { id: number; name: string; content: string; color_code: string }; setEdit: Dispatch<boolean> }) => {
  const [name, setName] = useState(label.name);
  const [content, setContent] = useState(label.content);
  const [colorCode, setColorCode] = useState(label.color_code);
  useEffect(() => {
    if (colorCode.length > 6) setColorCode((code) => code.slice(0, 6));
  }, [colorCode]);
  const setRandomColorCode = () => setColorCode(Math.floor(Math.random() * (parseInt("FFFFFF", 16) + 1)).toString(16));
  return (
    <EditModalWrapper>
      <Title>레이블 편집</Title>
      <LabelWrapper>
        <Label name={name} color_code={colorCode} />
      </LabelWrapper>
      <LabelName>
        <LabelTitle>레이블 이름</LabelTitle>
        <LabelNameInput value={name} onChange={({ target }) => setName(target.value)} />
      </LabelName>
      <LabelContent>
        <LabelTitle>설명(선택)</LabelTitle>
        <LabelContentInput value={content} onChange={({ target }) => setContent(target.value)} />
      </LabelContent>
      <LabelColor>
        <LabelTitle>배경 색상</LabelTitle>
        <LabelColorInput value={"#" + colorCode} onChange={({ target }) => setColorCode(target.value.replace("#", ""))} />
        <RefreshIcon onClick={setRandomColorCode} />
      </LabelColor>
      <CancelButton onClick={() => setEdit(false)}>
        <CancelIcon />
        <CancelButtonText>취소</CancelButtonText>
      </CancelButton>
      <ConfirmButton>
        <ConfirmIcon />
        <ConfirmButtonText>확인</ConfirmButtonText>
      </ConfirmButton>
    </EditModalWrapper>
  );
};

const RefreshIcon = ({ onClick }: { onClick: MouseEventHandler }) => (
  <RefreshIconWrapper onClick={onClick}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path d="M0.666748 2.66699V6.66699H4.66675" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.3333 13.333V9.33301H11.3333" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M13.6601 6.00038C13.322 5.0449 12.7473 4.19064 11.9898 3.51732C11.2322 2.844 10.3164 2.37355 9.32789 2.14988C8.33934 1.92621 7.31024 1.9566 6.33662 2.23823C5.363 2.51985 4.47658 3.04352 3.76008 3.76038L0.666748 6.66704M15.3334 9.33371L12.2401 12.2404C11.5236 12.9572 10.6372 13.4809 9.66354 13.7625C8.68992 14.0441 7.66082 14.0745 6.67227 13.8509C5.68372 13.6272 4.76795 13.1568 4.01039 12.4834C3.25284 11.8101 2.67819 10.9559 2.34008 10.0004"
          stroke="#6E7191"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </RefreshIconWrapper>
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

const ConfirmIcon = () => (
  <ConfirmIconWrapper>
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.8335 9.77366V13.3337C13.8335 13.6873 13.693 14.0264 13.443 14.2765C13.1929 14.5265 12.8538 14.667 12.5002 14.667H3.16683C2.81321 14.667 2.47407 14.5265 2.22402 14.2765C1.97397 14.0264 1.8335 13.6873 1.8335 13.3337V4.00033C1.8335 3.6467 1.97397 3.30756 2.22402 3.05752C2.47407 2.80747 2.81321 2.66699 3.16683 2.66699H6.72683"
        stroke="#FEFEFE"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5002 1.33301L15.1668 3.99967L8.50016 10.6663H5.8335V7.99967L12.5002 1.33301Z"
        stroke="#FEFEFE"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </ConfirmIconWrapper>
);

const EditModalWrapper = styled.div`
  position: relative;
  width: 1280px;
  height: 345px;
  background: #fefefe;
  margin-top: 1px;
  &:last-child {
    border-radius: 0px 0px 16px 16px;
  }
`;
const Title = styled.div`
  position: absolute;
  left: 32px;
  top: 32px;
  font-size: 24px;
  line-height: 40px;
  color: #000000;
`;
const LabelWrapper = styled.div`
  position: absolute;
  left: 116px;
  top: 191px;
`;
const LabelTitle = styled.div`
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
const LabelName = styled.div`
  position: absolute;
  width: 904px;
  height: 40px;
  left: 344px;
  top: 96px;
  background: #eff0f6;
  border-radius: 11px;
`;
const LabelNameInput = styled.input`
  all: unset;
  position: absolute;
  width: 768px;
  height: 40px;
  left: 112px;
  top: 0px;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #14142b;
`;
const LabelContent = styled.div`
  position: absolute;
  width: 904px;
  height: 40px;
  left: 344px;
  top: 152px;
  background: #eff0f6;
  border-radius: 11px;
`;
const LabelContentInput = styled.input`
  all: unset;
  position: absolute;
  width: 768px;
  height: 40px;
  left: 112px;
  top: 0px;
  font-size: 16px;
  line-height: 28px;
  color: #14142b;
`;
const LabelColor = styled.div`
  position: absolute;
  width: 240px;
  height: 40px;
  left: 344px;
  top: 209px;
  background: #eff0f6;
  border-radius: 11px;
`;
const LabelColorInput = styled.input`
  all: unset;
  position: absolute;
  width: 80px;
  height: 40px;
  left: 112px;
  top: 0px;
  font-size: 16px;
  line-height: 28px;
  color: #14142b;
`;
const RefreshIconWrapper = styled.div`
  position: absolute;
  left: 83.33%;
  right: 10%;
  top: 30%;
  bottom: 30%;
`;
const CancelButton = styled.div`
  position: absolute;
  width: 116px;
  height: 36px;
  left: 1000px;
  top: 273px;
  background: #fefefe;
  border: 2px solid #007aff;
  border-radius: 11px;
`;
const CancelIconWrapper = styled.div`
  position: absolute;
  left: 32.08%;
  right: 54.58%;
  top: 30%;
  bottom: 30%;
`;
const CancelButtonText = styled.div`
  position: absolute;
  left: 57px;
  top: 8px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #007aff;
`;
const ConfirmButton = styled.div`
  position: absolute;
  width: 120px;
  height: 40px;
  left: 1128px;
  top: 273px;
  background: #007aff;
  border-radius: 11px;
`;
const ConfirmIconWrapper = styled.div`
  position: absolute;
  left: 32.08%;
  right: 54.58%;
  top: 30%;
  bottom: 30%;
`;
const ConfirmButtonText = styled.div`
  position: absolute;
  width: 23px;
  height: 20px;
  left: 58.5px;
  top: 10px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: #fefefe;
`;

export default EditModal;
