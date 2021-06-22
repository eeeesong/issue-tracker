import styled from "styled-components";
import InfoBox from "./InfoBox";
import { milestoneListAtom } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const Main = () => {
  const [milestoneList, setMilestoneList] = useRecoilState(milestoneListAtom);
  // console.log(MilestoneList);
  // const milestoneList = useRecoilValue(milestoneListAtom);
  const list = milestoneList.map((e) => (
    <MilestoneList key={e.id} data-index={e.id}>
      <MainBox>
        <MainInfo>
          <Title>{e.title}</Title>
          <Date>{e.due_date}</Date>
        </MainInfo>
        <DetailInfo>{e.description}</DetailInfo>
      </MainBox>
      <InfoBox key={e.id} infoIndex={e.id} />
    </MilestoneList>
  ));
  useEffect(() => {
    const getData = async () => {
      const responceGet = await fetch(`http://3.34.122.67/api/milestones`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data, error } = await responceGet.json();
      setMilestoneList(data);
    };
    getData();
  }, [milestoneList]);
  return <MainWrapper>{list}</MainWrapper>;
};
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
