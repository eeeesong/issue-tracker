import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { milestoneListAtom } from "atoms/atoms";

const Header = () => {
  const milestoneList = useRecoilValue(milestoneListAtom);
  const createMilestoneCount = () => {
    const newArr = [...milestoneList];
    return `${newArr.length}개의 레이블`;
  };
  return <HeaderWrapper>{createMilestoneCount()}</HeaderWrapper>;
};

const HeaderWrapper = styled.div`
  padding: 25px;
  border-radius: 20px 20px 0 0;
  background-color: #f7f7fc;
`;

export default Header;
