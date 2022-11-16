import styled from 'styled-components';

export const Option = styled.li`
  display: flex;
  height: 55px;
  cursor: pointer;
  align-items: center;
  padding: 0 16px;
  border-radius: 8px;
  background: #fff;
  &:hover {
    background: #f2f2f2ff;
  }
`;
export const OptionMenu = styled.div`
  width: 90px;
  margin: 150px auto;
`;
export const SelectBtn = styled.div`
  display: flex;
  height: 55px;
  background: #fff;
  padding: 20px;
  font-size: 18px;
  font-weight: 400;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
export const List = styled.ul`
  position: absolute;
  padding: 20px;
  background: #fff;
  margin-top: 20px;
  right: 10px;
  border-radius: 8px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  width: 180px;
  visibility: hidden;
`;
