import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.label`
  display: flex;
  align-items: center;
`;

const Checkmark = styled.div`
  ${({ theme: { colors } }) => `
    display: inline-block;
    box-sizing: border-box;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    background: ${colors.white};
    transition: all 150ms;
    cursor: pointer;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 50%;
        width: 14.7px;
        height: 14.7px;
        background-color: transparent;
        transition: background-color .26s ease;
    }
    & > div {
        transition: all 150ms;
        display: block;
        background: ${colors.main};
    }
    `}
`;

const Input = styled.input.attrs({
  type: 'radio',
})`
  display: none;
  & ~ ${Checkmark} {
    border: 1px solid ${({ theme: { colors } }) => colors.gray};
    & > div {
      transform: scale(0);
    }
  }
  &:checked ~ ${Checkmark} {
    border: 1px solid ${({ theme: { colors } }) => colors.main};
    &:after {
      background-color: ${({ theme: { colors } }) => colors.main};
    }
  }
`;

const Label = styled.span`
  padding-left: 8px;
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme: { colors } }) => colors.blackGray};
`;

const Radio = ({ label, type, ...props }) => (
  <Wrapper>
    <Input {...props} />
    <Checkmark />
    {label && <Label>{label}</Label>}
  </Wrapper>
);

export default Radio;
