import AddButton from "components/common/AddButton";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { milestoneInputAtom, milestoneListAtom } from "atoms/atoms";
import MilestoneInputContainer from "components/common/MilestoneInputContainer";
const MilestoneModal = () => {
  const [, setMilestoneList] = useRecoilState(milestoneListAtom);
  const [milestoneInfo, setMilestoneInfo] = useRecoilState(milestoneInputAtom);
  const createMilestone = async () => {
    const time = milestoneInfo.due_date + " 00:00";
    await fetch(`http://3.34.122.67/api/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...milestoneInfo,
        due_date: time,
      }),
    });
    const responceGet = await fetch(`http://3.34.122.67/api/milestones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setMilestoneInfo({
      title: "",
      due_date: "",
      description: "",
    });
    const { data } = await responceGet.json();
    setMilestoneList(data);
  };
  return (
    <MilestoneModalWrapper>
      <Title>새로운 마일스톤 추가</Title>
      <MilestoneInputContainer />
      <AddButton text={"완료"} onClick={createMilestone} />
    </MilestoneModalWrapper>
  );
};

const Title = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 40px;
  margin-bottom: 20px;
`;
const MilestoneModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 50px;
  top: 30px;
  margin-top: 50px;
  width: 92%;
  height: 200px;
  border: 1px solid gray;
  border-radius: 20px;
`;

export default MilestoneModal;
