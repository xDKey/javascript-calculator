import styled from 'styled-components';

const Button = ({ innerText, id, handleClick }) => {
  return (
    <StyledButton id={id} onClick={handleClick}>
      {innerText}
    </StyledButton>
  );
};

const StyledButton = styled.div`
  font-family: Lexend;
  font-size: 26px;

  grid-area: ${({ id }) => id};

  width: ${({ id }) => {
    if (id === 'zero') return '140px';
    if (id === 'clear') return '140px';
    return '70px';
  }};
  height: ${({ id }) => (id === 'equals' ? '140px' : '70px')};

  background-color: ${({ id }) => {
    if (id === 'clear') return 'brown';
    if (id === 'equals') return 'rgb(12, 141, 141)';
    return 'rgb(54, 53, 53)';
  }};
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  box-sizing: border-box;

  cursor: pointer;
  user-select: none;
  
  &:hover {
    border-color: cyan;
    color: black;
  }
`;

export default Button;
