import React from 'react';
import styled from 'styled-components';
import PrimaryButton from './Primary';
import OutlinedButton from './Outlined';

const Button = ({ type, htmlType, ...props }) => {
  const compoundedProps = { ...props, type: htmlType };
  return type === 'outlined' ? (
    <OutlinedButton {...compoundedProps} />
  ) : (
    <PrimaryButton {...compoundedProps} />
  );
};

export default styled(Button)``;
