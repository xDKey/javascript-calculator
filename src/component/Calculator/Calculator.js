import { useState } from 'react';
import ButtonsPad from '../ButtonsPad/ButtonsPad';
import Display from '../Display/Display';
import './Calculator.css';

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
    if (isCalculated) return false
    let expression = endsWithOperator(accumulateDisplay)
      ? accumulateDisplay.slice(0, -1)
      : accumulateDisplay;

    expression = expression.replace(/x/g, '*');
    // eslint-disable-next-line no-eval
    const answer = Math.round(10000 * eval(expression)) / 10000 + '';

    setCurrentDisplay(answer);
    setAccumulateDisplay(`${accumulateDisplay} = ${answer}`);
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
    if (currentDisplay.length > 11) return setCurrentDisplay('Too much digitals')
    
    if (value === '.' && currentDisplay.includes('.')) return false;

    if (currentDisplay === '0' || checkIsOperator(value)) setCurrentDisplay(value);
    else setCurrentDisplay(currentDisplay + value);

    if (!checkIsOperator(value)) {
      if (accumulateDisplay === '' || accumulateDisplay === '0') return setAccumulateDisplay(value);
      return setAccumulateDisplay(accumulateDisplay + value);
    }

    return handleOperatorClick(value);
  };

  return (
    <div className='calculator'>
      <Display
        accumulateDisplay={accumulateDisplay}
        currentDisplay={currentDisplay}
      />
      <ButtonsPad handleClick={handleClick} />
    </div>
  );
};

export default Calculator;
