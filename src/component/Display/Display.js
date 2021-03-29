import styled from 'styled-components';

const Display = ({ accumulateDisplay, currentDisplay }) => {
  return (
    <StyledDisplay>
      <DisplayAccumulator>{accumulateDisplay}</DisplayAccumulator>
      <DisplayCurrent id='display'>{currentDisplay}</DisplayCurrent>
    </StyledDisplay>
  );
};

const StyledDisplay = styled.section`
  grid-area: display;
  background: rgb(105, 117, 117);
  width: 100%;
  height: 70px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-family: Electrolize;
`;

const DisplayAccumulator = styled.div`
  color: rgb(252, 180, 0);
`;

const DisplayCurrent = styled.div`
  align-self: flex-end;
  padding-right: 3px;

  font-size: 1.8rem;
`;

export default Display;
