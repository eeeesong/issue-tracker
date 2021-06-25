import styled from "styled-components";
import InfoBox from "./InfoBox";
import { milestoneListAtom, milestoneInputAtom } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import MilestoneInputContainer from "../common/MilestoneInputContainer";
import AddButton from "components/common/AddButton";

const Main = () => {
  const [milestoneList, setMilestoneList] = useRecoilState(milestoneListAtom);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [milestoneInfo, setMilestoneInfo] = useRecoilState(milestoneInputAtom);
  const [openEdit, setOpenEdit] = useState(false);
  const EditMilestone = async () => {
    await fetch(`http://3.34.122.67/api/milestones/${editIndex}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(milestoneInfo),
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
    setEditIndex(null);
  };

  const list = milestoneList.map((e) =>
    e.id === editIndex ? (
      <EditContainer key={e.id}>
        <EditTitle>마일스톤 편집</EditTitle>
        <MilestoneInputContainer openEdit={openEdit} list={e} />
        <Btn>
          <AddButton
            openEdit={openEdit}
            text={"취소"}
            onClick={() => setEditIndex(null)}
          />

          <AddButton
            openEdit={openEdit}
            text={"완료"}
            onClick={EditMilestone}
          />
        </Btn>
      </EditContainer>
    ) : (
      <MilestoneList key={e.id}>
        <MainBox>
          <MainInfo>
            <Title>{e.title}</Title>
            <Date>{e.due_date}</Date>
          </MainInfo>
          <DetailInfo>{e.description}</DetailInfo>
        </MainBox>
        <InfoBox
          key={e.id}
          infoIndex={e.id}
          setOpenEdit={setOpenEdit}
          setEditIndex={setEditIndex}
        />
      </MilestoneList>
    )
  );
  useEffect(() => {
    const getData = async () => {
      const responceGet = await fetch(`http://3.34.122.67/api/milestones`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = await responceGet.json();
      setMilestoneList(data);
    };
    getData();
  }, [milestoneList, setMilestoneList]);
  return <MainWrapper>{list}</MainWrapper>;
};
const Btn = styled.div`
  display: flex;
`;
const EditContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  padding: 25px;
  padding-bottom: 60px;
`;
const EditTitle = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
`;
const Title = styled.div`
  margin-right: 10px;
`;
const Date = styled.div``;
const MainInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const DetailInfo = styled.div``;
const MainBox = styled.div``;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MilestoneList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  border-bottom: 1px solid #d9dbe9;
  &:nth-last-child(1) {
    border-bottom: none;
  }
`;
export default Main;
