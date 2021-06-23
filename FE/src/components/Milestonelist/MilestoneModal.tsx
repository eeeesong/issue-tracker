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
          <NameTitle>파일스톤 이름</NameTitle>
          <InputName onChange={onChangeName} value={milestoneInfo.title} />
        </NameBox>
        <DateBox>
          <DateTitle>완료일 선택</DateTitle>
          <InputDate onChange={onChangeDate} value={milestoneInfo.due_date} />
        </DateBox>
      </Main>
      <DetailBox>
        <DetailName>설명(선택)</DetailName>
        <InputDetail
          onChange={onChangeDetail}
          value={milestoneInfo.description}
        />
      </DetailBox>
      <AddButton text={"완료"} onClick={createMilestone} />
    </MilestoneModalWrapper>
  );
};
const DetailName = styled.div``;
const DetailBox = styled.div`
  display: flex;
`;
const DateBox = styled.div`
  display: flex;
  margin-left: 10px;
`;
const DateTitle = styled.div``;
const NameBox = styled.div`
  display: flex;
`;
const NameTitle = styled.div``;
const Main = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const InputName = styled.input``;
const InputDate = styled.input``;
const InputDetail = styled.input``;
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
