import React from 'react';
import Arrow from './Arrow';
import './Checkbox.scss';




const Checkbox = ({
  checked,
  error = false,
  type,
  label,
  onChange,
  icon,
  ...props
}) => {
  const [isChecked, setChecked] = React.useState(
    typeof checked !== 'undefined' ? checked : false
  );

  React.useEffect(() => {
    if (typeof checked !== 'undefined' && checked !== isChecked) {
      setChecked(checked);
    }
  }, [checked]);

  const handleChekboxChange = React.useCallback(
    (e) => {
      if (typeof checked === 'undefined') {
        setChecked((isChecked) => !isChecked);
      }
      if (typeof onChange === 'function') {
        onChange(e);
      }
    },
    [onChange]
  );

  const checkboxView = () => {
    switch (type) {
      case 'squar': {
        return (
          <div {...props} className='fs-ui-checkbox__squar'>
            <Arrow width={15} height={10} />
          </div>
        );
      }
      // case 'round': {
      //   return (
      //     <RoundedLabel {...props} checked={isChecked}>
      //       <Round />
      //     </RoundedLabel>
      //   );
      // }

    }
  };
  const labelClassName = `fs-ui-checkbox${error ? ' fs-ui-checkbox--error' : ''}${checked ? ' fs-ui-checkbox--checked': ''}`; 
  return (
    <label className={labelClassName}>
      <div className='fs-ui-checkbox__flex'>
        <input
          className='fs-ui-checkbox__input'
          checked={isChecked}
          type='checkbox'
          onChange={handleChekboxChange}
          {...props}
        />
        {checkboxView()}
        {icon && <img className='fs-ui-checkbox__icon' src={icon} width={24} height={24}/>}
        {label && <span className='fs-ui-checkbox__description'>{label}</span>}
      </div>
    </label>
  );
};

export default Checkbox;
