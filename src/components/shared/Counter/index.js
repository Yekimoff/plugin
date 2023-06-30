import React from 'react';
import './Counter.scss';

export default function({
  max,
  min = 0,
  onCustomChange,
  value,
  outlined = false,
  ...props
}) {
  const [count, setCount] = React.useState(value || min);

  React.useEffect(() => {
    if (value && value !== count) {
      setCount(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleMinus = (e) => {
    e.preventDefault();
    const minVal = min;
    if (count - 1 < minVal) {
      return;
    }
    typeof onCustomChange === 'function' &&
      onCustomChange(count - 1, props.name);
    setCount(count - 1);
  };

  const handlePlus = (e) => {
    e.preventDefault();
    if (max && count + 1 > max) {
      return;
    }
    typeof onCustomChange === 'function' &&
      onCustomChange(count + 1, props.name);
    setCount(count + 1);
  };

  const handleChange = (e) => {
    setCount(parseInt(e.target.value));
    typeof onCustomChange === 'function' &&
      onCustomChange(parseInt(e.target.value), props.name);
  };

  return (
    <div className='fs-ui-counter'>
      <button
        className='fs-ui-counter__button-base fs-ui-counter__minus '
        // outlined={outlined}
        disabled={count === min}
        onClick={handleMinus}
      />
      <input className='fs-ui-counter__input' onChange={handleChange} value={count} {...props} />
      <button
      className='fs-ui-counter__button-base fs-ui-counter__plus' 
        outlined={outlined} 
        disabled={count === max} 
        onClick={handlePlus} 
      />
    </div>
  )
}