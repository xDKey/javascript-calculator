import { useState } from 'react';
import Button from '../Button/Button';
import Display from '../Display/Display';
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

const checkIsOperator = (str) => /[x/\-+]/g.test(str);
const endsWithOperator = (str) => /.*[x\-+/]$/g.test(str);
const endsWithMinus = (str) => /.*-$/g.test(str);

const Calculator = () => {
  const [currentDisplay, setCurrentDisplay] = useState('0');
  const [prevDisplay, setPrevDisplay] = useState('0');
  const [accumulateDisplay, setAccumulateDisplay] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleNumberClick = ({ target }) => {
    const value = target.innerText;

    setIsCalculated(false);
    if (currentDisplay === '0' || checkIsOperator(currentDisplay))
      setCurrentDisplay(value);
    else setCurrentDisplay(currentDisplay + value);
    setAccumulateDisplay(
      currentDisplay === '0' && value === '0'
        ? accumulateDisplay === ''
          ? value
          : accumulateDisplay
        : /([^.0-9]0|^0)$/.test(accumulateDisplay)
        ? accumulateDisplay.slice(0, -1) + value
        : accumulateDisplay + value
    );
  };

  const handleOperatorClick = ({ target }) => {
    const value = target.innerText;
    
    setCurrentDisplay(value);
    setIsCalculated(false);
    if (isCalculated) setAccumulateDisplay(prevDisplay + value);
    else if (!endsWithOperator(accumulateDisplay)) {
      setPrevDisplay(accumulateDisplay);
      setAccumulateDisplay(accumulateDisplay + value);
    } else if (!endsWithMinus(accumulateDisplay)) {
      const newValue = endsWithMinus(accumulateDisplay + value)
        ? accumulateDisplay
        : prevDisplay;
      setAccumulateDisplay(newValue + value);
    } else if (value !== '-') setAccumulateDisplay(prevDisplay + value);
  };

  const result = () => {
    let expression = accumulateDisplay;
    while (endsWithOperator(expression)) expression = expression.slice(0, -1);
    expression = expression
      .replace(/x/g, '*')
      .replace(/‑/g, '-')
      .replace('--', '+0+0+0+0+0+0+');
    // eslint-disable-next-line no-eval
    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
    setCurrentDisplay(answer.toString());
    setAccumulateDisplay(
      expression
        .replace(/\*/g, '⋅')
        .replace(/-/g, '‑')
        .replace('+0+0+0+0+0+0+', '‑-')
        .replace(/(x|\/|\+)‑/, '$1-')
        .replace(/^‑/, '-') +
        '=' +
        answer
    );
    setPrevDisplay(answer);
    setIsCalculated(true);
  };

  const handleDecimal = () => {
    if (isCalculated) {
      setCurrentDisplay('0');
      setAccumulateDisplay('0');
      setIsCalculated(false);
    } else if (!currentDisplay.includes('.')) {
      setIsCalculated(false);
      setCurrentDisplay(currentDisplay + '.')
      setAccumulateDisplay(accumulateDisplay + '.')
      }
    }

  const reset = () => {
    setCurrentDisplay('0');
    setPrevDisplay('');
    setAccumulateDisplay('');
    setIsCalculated(false);
  };

  return (
    <div className='Calculator'>
      <Display
        accumulateDisplay={accumulateDisplay}
        currentDisplay={currentDisplay}
      />
      <Button key='clear' id='clear' innerText='AC' handleClick={reset} />
      <Button
        key='divide'
        id='divide'
        innerText='/'
        handleClick={handleOperatorClick}
      />
      <Button
        key='multiply'
        id='multiply'
        innerText='x'
        handleClick={handleOperatorClick}
      />
      <div className='numpad'>
        <Button
          key='zero'
          id='zero'
          innerText={0}
          handleClick={handleNumberClick}
        />
        <Button
          key='decimal'
          id='decimal'
          innerText='.'
          handleClick={handleDecimal}
        />
        {buttons.buttonsForNumpad.map((num, index) => (
          <Button
            key={num}
            id={num}
            innerText={index + 1}
            handleClick={handleNumberClick}
          />
        ))}
      </div>
      <Button
        key='subtract'
        id='subtract'
        innerText='-'
        handleClick={handleOperatorClick}
      />
      <Button
        key='add'
        id='add'
        innerText='+'
        handleClick={handleOperatorClick}
      />
      <Button key='equals' id='equals' innerText='=' handleClick={result} />
    </div>
  );
};

export default Calculator;
