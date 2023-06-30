import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';

const StyledInput = styled.input`
  font-family: Open Sans;
  color: #3c3c3c;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  outline: none;
  padding: 10px 12px;
  width: 100%;
  text-align: left;
  &:focus {
    border: 1px solid #3c3c3c;
  }
  ${({ error }) => (error ? 'border: 1px solid #e73c3e;' : '')}
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const Input = ({
  value = '',
  error,
  customInput,
  onClick,
  onChange,
  onBlur,
  onFocus,

  ...props
}) => {
  const [innerValue, setValue] = useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const forwardChanges = useCallback(
    (e) => onChange(e),
    []
  );

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.value);
    forwardChanges(e);
  };

  const handleFocus = (e) => {
    typeof onFocus === 'function' && onFocus(e);
  };

  const handleBlur = (e) => {
    onChange(e);
    forwardChanges(e);
    typeof onBlur === 'function' && onBlur(e);
  };

  return (
    <InputMask
      value={innerValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      mask={customInput ? '99.9999' : '99.99.9999'}
    >
      <StyledInput
        {...props}
        className="example-custom-input"
        placeholder="дд.мм.гггг"
        onClick={onClick}
        error={error}
      />
    </InputMask>
  );
};

export default Input;
