import Button from '../Button/Button';
import './Calculator.css';

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

const Calculator = () => {
  return (
    <div className='Calculator'>
      <div id='display' />
      <Button key='clear' id='clear' innerText='AC' />
      <Button key='divide' id='divide' innerText='/' />
      <Button key='multiply' id='multiply' innerText='x' />
      <div className='numpad'>
        <Button key='zero' id='zero' innerText={0} />
        <Button key='decimal' id='decimal' innerText='.' />
        {buttons.buttonsForNumpad.map((num, index) => (
          <Button key={num} id={num} innerText={index + 1} />
        ))}
      </div>
      <Button key='subtract' id='subtract' innerText='-' />
      <Button key='add' id='add' innerText='+' />
      <Button key='equals' id='equals' innerText='=' />
    </div>
  );
};

export default Calculator;
