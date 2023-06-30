import React, { useCallback, useEffect, useState } from 'react';
import { MaskedInput, Wrapper } from './styles';


export const MaskedField = ({
  label,
  error,
  onFocus,
  onBlur,
  onClick,
  inputRef,
  children,
  value,
  mask,
  width,
  height,
  placeholder,
  focus,
  ...props
}) => {
  const [isFocused, setFocus] = useState(false);
  const [maskValue, setMaskValue] = useState('');

  React.useEffect(() => {
    if (focus !== undefined) {
      setFocus(focus);
    }
  }, [focus]);

  const handleFocus = useCallback(
    (e) => {
      e.preventDefault();
      setFocus(true);
    },
    []
  );

  const handleBlur = useCallback(
    (e) => {
      e.preventDefault();
      setFocus(false);
    },
    []
  );

  const handleClick = (e) => {
    typeof onClick === 'function' && onClick(e);
  };

  useEffect(() => {
    const maskVal = mask(value);
    setMaskValue(maskVal);
  }, [value, mask]);

  return (
    <Wrapper focused={isFocused}>
      <input value={value} style={{ display: 'none' }} {...props} />
      <MaskedInput
        focus={isFocused}
        initial={!maskValue && !!placeholder}
        width={width}
        height={height}
        onClick={handleClick}
        type="button"
        onFocus={handleFocus}
        onBlur={handleBlur}
        screen={window.screen.width}
      >
        {maskValue || placeholder}
        {children}
      </MaskedInput>
    </Wrapper>
  );
};
