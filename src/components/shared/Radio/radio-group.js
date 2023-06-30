import React, { useState } from 'react';
import styled from 'styled-components';
import Radio from './radio';

const RadioGroupWrapper = styled.div`
  & > label {
    margin-bottom: 16px;
  }
  & > :last-child {
    margin-bottom: 0;
  }

  ${({ flex }) =>
    flex
      ? `
        display: inline-flex;
        height: 42px;
        & > label {
            margin-bottom: 0;
            margin-right: 18px;
        }
        & > :last-child {
            margin-right: 0;
        }
        @media (max-width: 767px) {
          & > label {
            margin-right: 20px;
          }

        }
    `
      : ''};
`;

const RadioGroup = ({
  onChange,
  items,
  defaultValue,
  flex,
  withAutoSelect,
  autoSelectData,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);

  React.useEffect(() => {
    //для автозаполнения на странице бронирования
    if (withAutoSelect && value !== autoSelectData && autoSelectData) {
      setValue(autoSelectData);
    }
  }, [withAutoSelect, autoSelectData]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    typeof onChange === 'function' && onChange(e.target.value);
  };

  const content = items.map((item) => (
    <Radio
      key={item.value}
      onChange={handleOnChange}
      {...props}
      checked={value === item.value}
      {...item}
    />
  ));

  return <RadioGroupWrapper flex={flex}>{content}</RadioGroupWrapper>;
};

export default RadioGroup;
