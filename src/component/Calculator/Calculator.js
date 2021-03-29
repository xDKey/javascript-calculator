import { useState } from 'react';
import styled from 'styled-components';
import ButtonsPad from '../ButtonsPad/ButtonsPad';
import Display from '../Display/Display';

const checkIsOperator = (str) => /[x/\-+]/g.test(str);
const endsWithOperator = (str) => /.*[x\-+/]$/g.test(str);
const endsWithMinus = (str) => /.*-$/g.test(str);

const Calculator = () => {
  const [currentDisplay, setCurrentDisplay] = useState('0');
  const [prevDisplay, setPrevDisplay] = useState('0');
  const [accumulateDisplay, setAccumulateDisplay] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleOperatorClick = (value) => {
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
    if (isCalculated) return false;
    let expression = endsWithOperator(accumulateDisplay)
      ? accumulateDisplay.slice(0, -1)
      : accumulateDisplay;

    // eslint-disable-next-line no-eval
    const answer = Math.round(10000 * eval(expression.replace(/x/g, '*'))) / 10000 + '';

    setCurrentDisplay(answer);
    setAccumulateDisplay(`${expression} = ${answer}`);
    setPrevDisplay(answer);
    setIsCalculated(true);
  };

  const reset = () => {
    setCurrentDisplay('0');
    setPrevDisplay('');
    setAccumulateDisplay('');
    setIsCalculated(false);
  };

  const handleClick = ({ target }) => {
    const value = target.innerText;

    if (value === '=') return result();

    setIsCalculated(false);

    if (value === 'AC') return reset();
    if (currentDisplay.length > 11)
      return setCurrentDisplay('Too much digitals');

    if (value === '.' && currentDisplay.includes('.')) return false;

    if (currentDisplay === '0' || checkIsOperator(value))
      setCurrentDisplay(value);
    else setCurrentDisplay(currentDisplay + value);

    if (!checkIsOperator(value)) {
      if (accumulateDisplay === '' || accumulateDisplay === '0')
        return setAccumulateDisplay(value);
      return setAccumulateDisplay(accumulateDisplay + value);
    }

    return handleOperatorClick(value);
  };

  return (
    <StyledCalculator>
      <Display
        accumulateDisplay={accumulateDisplay}
        currentDisplay={currentDisplay}
      />
      <ButtonsPad handleClick={handleClick} />
    </StyledCalculator>
  );
};

const StyledCalculator = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(4, 1fr);

  grid-template-areas:
    'display display display display'
    'clear clear divide multiply'
    'numpad numpad numpad subtract'
    'numpad numpad numpad add'
    'numpad numpad numpad equals'
    'numpad numpad numpad equals';

  width: 280px;

  background: black;
`;

export default Calculator;
