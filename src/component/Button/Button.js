import './Button.css';

const Button = ({ innerText, id, handleClick }) => {
  return (
    <div
      className='button num-button'
      id={id}
      style={{ gridArea: id }}
      onClick={handleClick}
    >
      {innerText}
    </div>
  );
};

export default Button;
