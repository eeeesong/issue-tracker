import styled from "styled-components";
import InfoBox from "./InfoBox";
import { milestoneListAtom } from "atoms/atoms";
import { useRecoilValue } from "recoil";
const Main = () => {
  const milestoneList = useRecoilValue(milestoneListAtom);
  const list = milestoneList.map((e) => (
    <MilestoneList key={e.id}>
      <MainBox>
        <MainInfo>
          <Title>{e.title}</Title>
          <Date>{e.date}</Date>
        </MainInfo>
        <DetailInfo>{e.detail}</DetailInfo>
      </MainBox>
      <InfoBox />
    </MilestoneList>
  ));
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
  border-bottom: 1px solid black;
  &:nth-last-child(1) {
    border-bottom: none;
  }
`;
export default Main;
