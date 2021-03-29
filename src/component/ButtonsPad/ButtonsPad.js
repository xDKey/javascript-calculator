import styled from 'styled-components';
import Button from '../Button/Button';

const buttons = {
  buttonsForNumpad: [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ],
};

const ButtonsPad = ({ handleClick }) => {
  return (
    <>
      <Button id='clear' innerText='AC' handleClick={handleClick} />
      <Button id='divide' innerText='/' handleClick={handleClick} />
      <Button id='multiply' innerText='x' handleClick={handleClick} />
      <Button id='subtract' innerText='-' handleClick={handleClick} />
      <Button id='add' innerText='+' handleClick={handleClick} />
      <Button id='equals' innerText='=' handleClick={handleClick} />

      <NumPad >
        <Button id='zero' innerText={0} handleClick={handleClick} />
        <Button id='decimal' innerText='.' handleClick={handleClick} />
        {buttons.buttonsForNumpad.map((num, index) => (
          <Button
            key={num}
            id={num}
            innerText={index + 1}
            handleClick={handleClick}
          />
        ))}
      </NumPad>
    </>
  );
};

const NumPad = styled.div`
  grid-area: numpad;
  width: 210px;

  display: flex;

  flex-wrap: wrap-reverse;
`;

export default ButtonsPad;
