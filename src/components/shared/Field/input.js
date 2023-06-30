import React, { useCallback, useState } from 'react';
import { StyledInput, Wrapper, Label, InputWrapper } from './styles';
import styled from 'styled-components';

const ErrorText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 16px;
  color: #e73c3e;
  position: absolute;
  white-space: nowrap;
`;



const Row = styled.div`
  display: flex;
  align-items: center;
`;





const Input = ({
  label,
  error,
  onFocus,
  onBlur,
  inputRef,
  children,
  placeholder,
  value,
  height,
  wrapperClassName,
  isInfo,
  ...props
}) => {
  const [isFocused, setFocus] = useState(false);
  const [showInfo, setShowInfo] = useState('0');
  const handleFocus = useCallback(
    (e) => {
      setFocus(true);
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e) => {
      setFocus(false);
      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    },
    [onBlur]
  );

  return (
    <Wrapper
      className={wrapperClassName}
      focused={isFocused || (error !== undefined && error !== '')}
    >
      {label && (
        <Row>
          <Label>{label} </Label>
        </Row>
      )}
      <InputWrapper>
        <StyledInput
          height={height}
          value={value}
          placeholder={placeholder}
          error={error}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      {children}
    </Wrapper>
  );
};

export default Input;
