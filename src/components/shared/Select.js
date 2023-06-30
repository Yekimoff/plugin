import React from 'react';
import { default as ReactSelect, components } from 'react-select';
import styled from 'styled-components';
import Text from './Typography';

const Label = styled(Text)`
  display: block;
  margin-bottom: 5px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
`;

const OptionTitle = styled(Text)`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #3c3c3c;
  padding-bottom: 2px;
`;

const OptionDocument = styled(Text)`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  color: #737373;
`;

const Option = (props) => {
  return (
    <components.Option {...props}>
      <OptionContainer>
        <OptionTitle>{props?.data?.label}</OptionTitle>
        <OptionDocument>{props?.data.subLabel}</OptionDocument>
      </OptionContainer>
    </components.Option>
  );
};

const groupOption = {
  option: (provided, state) => {
    return {
      ...provided,
      background: !state.isSelected ? '#FFFFFF' : '#EDF1FE',
    };
  },
};

const styles = {
  indicatorSeparator: (provided, state) => ({
    ...provided,
    visibility: 'hidden',
  }),

  input: (provided, state) => ({
    ...provided,
    fontFamily: 'Open Sans',
    color: '#3C3C3C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    paddingLeft: '12px',
    fontFamily: 'Open Sans',
    color: '#3C3C3C',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
  }),
  container: (provided, state) => ({
    ...provided,
    padding: 0,
  }),
  control: (provided, { isFocused, ...state }) => {
    const border = isFocused
      ? '1px solid #3C3C3C !important'
      : '1px solid #DCDCDC';
    const borderColor = isFocused ? '#3C3C3C' : '#DCDCDC';
    const boxShadow = 'none';
    return {
      ...provided,
      minHeight: 42,
      border,
      borderColor,
      boxShadow,
    };
  },
  menu: (provided, state) => ({ ...provided, zIndex: 100 }),
};

const Select= ({
  label,
  withCustomOption,
  ...props
}) => {
  return (
    <Label>
      {label && <Label color="dark-gray">{label}</Label>}
      {withCustomOption ? (
        <ReactSelect
          isMulti={false}
          components={{
            ClearIndicator: () => null,
            Option,
            ...(props.components || {}),
          }}
          styles={{ ...styles, ...groupOption }}
          {...props}
        />
      ) : (
        <ReactSelect
          components={{ ClearIndicator: () => null }}
          styles={styles}
          {...props}
        />
      )}
    </Label>
  );
};

export default Select;
