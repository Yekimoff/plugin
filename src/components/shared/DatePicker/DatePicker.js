import React from 'react';
import DatePickerBase from 'react-datepicker';
import styled from 'styled-components';
import Input from './Input';
import Head from './Head';
import { isSafari } from 'react-device-detect';

const Wrapper = styled.label`
  font-family: Open Sans;
  position: relative;
  & .react-datepicker-wrapper {
    width: 100%;
  }
  & .tui-calendare {
    z-index: 100;
    & .react-datepicker {
      &__header {
        padding: 0;
        border: none;
        background: #ffffff;
      }
      &__day-names {
        display: none;
      }
    }
  }
`;

const Label = styled.span`
  display: block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #737373;
  margin-bottom: 4px;
  cursor: pointer;
`;

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

const ExampleCustomInput = ({
  value,
  error,
  onClick,
  onChange,
  customInput,
}) => (
  <Input
    className="example-custom-input"
    onClick={onClick}
    value={value}
    onChange={onChange}
    error={error}
    customInput={customInput}
  />
);

const DatePicker = ({
  label,
  error,
  onChange,
  value,
  placeholder,
  className,
  isBirthDate,
  isOnlyMonth,
  customInput,
}) => {
  const handleChange = (date) => {
    const today = new Date();
    if (isSafari) {
      onChange(date);
    } else if (isBirthDate && date && today >= date) {
      onChange(date);
    } else if (!isBirthDate) {
      onChange(date);
    }
  };
  return (
    <Wrapper className={className}>
      {label && <Label>{label}</Label>}
      <DatePickerBase
        showMonthYearPicker={!!isOnlyMonth}
        placeholderText={placeholder}
        dateFormat={!isOnlyMonth ? 'dd.MM.yyyy' : 'MM.yyyy'}
        selected={value}
        showMonthDropdown
        showYearDropdown
        onChange={handleChange}
        className="tui-calendare-wrapper"
        renderCustomHeader={Head}
        customInput={
          <ExampleCustomInput error={error} customInput={customInput} />
        }
        popperClassName="tui-calendare"
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

export default DatePicker;
