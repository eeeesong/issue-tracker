import { milestoneListAtom } from "atoms/atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ChartBox from "./ChartBox";
import { Dispatch } from "react";

interface IInfoBox {
  infoIndex: number;
  setEditIndex: Dispatch<number | null>;
  setOpenEdit: Dispatch<boolean>;
}
const InfoBox = ({ infoIndex, setEditIndex, setOpenEdit }: IInfoBox) => {
  const [, setMilestoneInfo] = useRecoilState(milestoneListAtom);
  const deleteElement = async () => {
    await fetch(`http://3.34.122.67/api/milestones/${infoIndex}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const responceGet = await fetch(`http://3.34.122.67/api/milestones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = await responceGet.json();
    setMilestoneInfo(data);
  };
  const findIndex = () => {
    setEditIndex(infoIndex);
    setOpenEdit(true);
  };
  return (
    <InfoBoxWrapper>
      <UDBox>
        <UpdateBtn onClick={findIndex}>
          <EditIcon />
          편집
        </UpdateBtn>
        <DeleteBtn onClick={deleteElement}>
          <DeleteIcon />
          삭제
        </DeleteBtn>
      </UDBox>
      <ChartBox />
    </InfoBoxWrapper>
  );
};
const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3335 9.77366V13.3337C13.3335 13.6873 13.193 14.0264 12.943 14.2765C12.6929 14.5265 12.3538 14.667 12.0002 14.667H2.66683C2.31321 14.667 1.97407 14.5265 1.72402 14.2765C1.47397 14.0264 1.3335 13.6873 1.3335 13.3337V4.00033C1.3335 3.6467 1.47397 3.30756 1.72402 3.05752C1.97407 2.80747 2.31321 2.66699 2.66683 2.66699H6.22683"
      stroke="#6E7191"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.0002 1.33301L14.6668 3.99967L8.00016 10.6663H5.3335V7.99967L12.0002 1.33301Z"
      stroke="#6E7191"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4H3.33333H14"
      stroke="#FF3B30"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.3335 3.99967V2.66634C5.3335 2.31272 5.47397 1.97358 5.72402 1.72353C5.97407 1.47348 6.31321 1.33301 6.66683 1.33301H9.3335C9.68712 1.33301 10.0263 1.47348 10.2763 1.72353C10.5264 1.97358 10.6668 2.31272 10.6668 2.66634V3.99967M12.6668 3.99967V13.333C12.6668 13.6866 12.5264 14.0258 12.2763 14.2758C12.0263 14.5259 11.6871 14.6663 11.3335 14.6663H4.66683C4.31321 14.6663 3.97407 14.5259 3.72402 14.2758C3.47397 14.0258 3.3335 13.6866 3.3335 13.333V3.99967H12.6668Z"
      stroke="#FF3B30"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.6665 7.33301V11.333"
      stroke="#FF3B30"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.3335 7.33301V11.333"
      stroke="#FF3B30"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const UpdateBtn = styled.div`
  color: #6e7191;
  cursor: pointer;
`;
const DeleteBtn = styled.div`
  margin-left: 10px;
  color: #ff3b30;
  cursor: pointer;
`;
const UDBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const InfoBoxWrapper = styled.div``;

export default InfoBox;
