import Button from '../Button/Button';
import './ButtonsPad.css';

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

const ButtonsPad = ({
  reset,
  handleOperatorClick,
  handleNumberClick,
  handleDecimal,
  result,
}) => {
  return (
    <>
      <Button id='clear' innerText='AC' handleClick={reset} />
      <Button id='divide' innerText='/' handleClick={handleOperatorClick} />
      <Button id='multiply' innerText='x' handleClick={handleOperatorClick} />
      <Button id='subtract' innerText='-' handleClick={handleOperatorClick} />
      <Button id='add' innerText='+' handleClick={handleOperatorClick} />
      <Button id='equals' innerText='=' handleClick={result} />

      <div className='numpad'>
        <Button id='zero' innerText={0} handleClick={handleNumberClick} />
        <Button id='decimal' innerText='.' handleClick={handleDecimal} />
        {buttons.buttonsForNumpad.map((num, index) => (
          <Button
            key={num}
            id={num}
            innerText={index + 1}
            handleClick={handleNumberClick}
          />
        ))}
      </div>
    </>
  );
};

export default ButtonsPad;
