import AddButton from "components/common/AddButton";
import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { milestoneListAtom } from "atoms/atoms";
const MilestoneModal = () => {
  const [, setMilestoneList] = useRecoilState(milestoneListAtom);
  const [milestoneInfo, setMilestoneInfo] = useState({
    title: "",
    due_date: "",
    description: "",
  });
  const onChangeName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setMilestoneInfo((info) => ({ ...info, title: target.value }));
  const onChangeDate = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setMilestoneInfo((info) => ({ ...info, due_date: target.value }));
  const onChangeDetail = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setMilestoneInfo((info) => ({ ...info, description: target.value }));
  const createMilestone = async () => {
    const time = milestoneInfo.due_date + " 00:00";
    console.log({
      ...milestoneInfo,
      due_date: time,
    });
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
    const { data} = await responceGet.json();
    setMilestoneList(data);
  };
  return (
    <MilestoneModalWrapper>
      <Title>새로운 마일스톤 추가</Title>
      <Main>
        <NameBox>
          <NameTitle>제목</NameTitle>
          <InputName placeholder="마일스톤 이름" onChange={onChangeName} value={milestoneInfo.title} />
        </NameBox>
        <DateBox>
          <DateTitle>완료일 선택</DateTitle>
          <InputDate placeholder="완료일 선택" onChange={onChangeDate} value={milestoneInfo.due_date} />
        </DateBox>
      </Main>
      <DetailBox>
        <DetailTitle>설명(선택)</DetailTitle>
        <InputDetail
          placeholder="설명(선택)"
          onChange={onChangeDetail}
          value={milestoneInfo.description}
        />
      </DetailBox>
      <AddButton text={"완료"} onClick={createMilestone} />
    </MilestoneModalWrapper>
  );
};
const BoxStyle = styled.div`
background-color: #EFF0F6;
display: flex;
flex: auto;
text-align: center;
border-radius: 11px;
padding-left:20px;
`;
const DetailBox = styled(BoxStyle)`
flex:none;
`;
const DateBox = styled(BoxStyle)`
  margin-left: 10px;
`;
const NameBox = styled(BoxStyle)`
`;
const TitleStyle = styled.div`
display: flex;
align-items: center;
width: 80px;
/* margin-left:20px; */
`;

const DateTitle = styled(TitleStyle)`
`;
const NameTitle = styled(TitleStyle)`
`;
const DetailTitle = styled(TitleStyle)``;
const Main = styled.div`
width: 100%;
  display: flex;
  margin-bottom: 20px;
`;
const inputStyle = styled.input`
height: 40px;
background:transparent;
outline: none;
border: none;
font-size: 16px;
`;
const InputName = styled(inputStyle)`
`;
const InputDate = styled(inputStyle)`
`;
const InputDetail = styled(inputStyle)`
`;
const Title = styled.div`
  font-size: 30px;
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
