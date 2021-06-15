import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { labelCountSelector, labelListAtom } from "atoms/atoms";
import Label from "./Label";

const List = ({ isAdding }: { isAdding: boolean }) => {
  const labelCount = useRecoilValue(labelCountSelector);
  const labelList = useRecoilValue(labelListAtom);
  return (
    <ListWrapper isAdding={isAdding}>
      <Header>
        <HeaderText>{`${labelCount}개의 레이블`}</HeaderText>
      </Header>
      {labelList.map((label) => (
        <Label key={label.id} {...label} />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div<{ isAdding: boolean }>`
  position: absolute;
  top: ${({ isAdding }) => (isAdding ? "433px" : "64px")};
  background: #d9dbe9;
  border: 1px solid #d9dbe9;
  border-radius: 16px;
`;
const Header = styled.div`
  width: 1280px;
  height: 64px;
  background: #f7f7fc;
  border-radius: 16px 16px 0px 0px;
`;
const HeaderText = styled.div`
  position: absolute;
  width: 87px;
  height: 28px;
  left: 32px;
  top: 18px;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #6e7191;
`;

export default List;
