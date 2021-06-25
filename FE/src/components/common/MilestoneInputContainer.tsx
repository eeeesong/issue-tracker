import styled from "styled-components";
import { useRecoilState } from "recoil";
import { milestoneInputAtom } from "atoms/atoms";
import { ChangeEvent, useEffect } from "react";
interface Props {
  title?: string;
  id?: number;
  due_date?: string;
  description?: string;
}
interface IMilestoneInputContainer {
  list?: Props;
  openEdit?: boolean;
}
const MilestoneInputContainer = ({
  list,
  openEdit,
}: IMilestoneInputContainer) => {
  // 추가되는 마일스톤 정보
  const [milestoneInfo, setMilestoneInfo] = useRecoilState(milestoneInputAtom);
  const onChangeName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setMilestoneInfo((info) => ({ ...info, title: target.value }));
  const onChangeDate = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setMilestoneInfo((info) => ({ ...info, due_date: target.value }));
  const onChangeDetail = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setMilestoneInfo((info) => ({ ...info, description: target.value }));
  const dateStr = (list?: string) => {
    return list?.substr(0, 10);
  };
  useEffect(() => {
    setMilestoneInfo((info: any) => ({
      ...info,
      title: list?.title,
      due_date: list?.due_date,
      description: list?.description,
    }));
  }, [
    openEdit,
    list?.title,
    list?.due_date,
    list?.description,
    setMilestoneInfo,
  ]);
  return (
    <MilestoneInputContainerWrapper>
      <Main>
        <NameBox>
          {milestoneInfo.title && <NameTitle>제목</NameTitle>}
          <InputName
            placeholder="마일스톤 이름"
            onChange={onChangeName}
            value={milestoneInfo.title}
          />
        </NameBox>
        <DateBox>
          {milestoneInfo.due_date && <DateTitle>완료일 선택</DateTitle>}
          <InputDate
            placeholder="완료일 선택"
            onChange={onChangeDate}
            value={dateStr(milestoneInfo.due_date)}
          />
        </DateBox>
      </Main>
      <DetailBox>
        {milestoneInfo.description && <DetailTitle>설명(선택)</DetailTitle>}
        <InputDetail
          placeholder="설명(선택)"
          onChange={onChangeDetail}
          value={milestoneInfo.description}
        />
      </DetailBox>
    </MilestoneInputContainerWrapper>
  );
};

const MilestoneInputContainerWrapper = styled.div``;
const BoxStyle = styled.div`
  background-color: #eff0f6;
  display: flex;
  flex: auto;
  text-align: center;
  border-radius: 11px;
  padding-left: 20px;
`;
const DetailBox = styled(BoxStyle)`
  flex: none;
  margin-bottom: 20px;
`;
const DateBox = styled(BoxStyle)`
  margin-left: 10px;
`;
const NameBox = styled(BoxStyle)``;
const TitleStyle = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
`;

const DateTitle = styled(TitleStyle)``;
const NameTitle = styled(TitleStyle)``;
const DetailTitle = styled(TitleStyle)``;
const Main = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;
const inputStyle = styled.input`
  height: 40px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 16px;
  flex: auto;
`;
const InputName = styled(inputStyle)``;
const InputDate = styled(inputStyle)``;
const InputDetail = styled(inputStyle)``;

export default MilestoneInputContainer;
