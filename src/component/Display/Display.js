import './Display.css';

const Display = ({ accumulateDisplay, currentDisplay }) => {
  return (
    <div className='display'>
      <div className='display__accumulator'>{accumulateDisplay}</div>
      <div id='display' className='display__current'>{currentDisplay}</div>
    </div>
  );
};

export default Display;
