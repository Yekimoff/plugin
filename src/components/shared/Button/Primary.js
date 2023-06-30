/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const TIME1 = 400;
const TIME2 = TIME1 / 2;
const EASING = `cubic-bezier(.9,.1,.1,.9)`;

const loadingKeyframe = keyframes`
	0% {
		box-shadow 0px 0px 0px 0px rgb(255,255,0,1)
	}
	100% {
		box-shadow 0px 0px 0px 1rem rgb(255,255,0,0)
  }
`;
const showPseudosKeyframe = keyframes`
  0% {
    opacity 0;
  }
  100% {
    opacity 1;
  }
`;

const loadingAnimation = css`
  ${loadingKeyframe} ${TIME2 * 10}ms ${TIME1 * 1.2}ms infinite;
`;

const showPseudos = css`
  ${showPseudosKeyframe} ${TIME1}ms ${TIME2}ms ${EASING} forwards;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  margin: auto;

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 2px solid lightgray;
  background: transparent;
  width: 18px;
  height: 18px;
  border-radius: 50%;

  @media(max-width: 1124px) {
    width: 16px;
    height: 18px;
    margin: auto;

    border-top: 1px solid grey;
    border-right: 1px solid grey;
    border-bottom: 1px solid grey;
    border-left: 1px solid lightgray;
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PrimaryButton = styled.button`
  ${({ color, isLoading }) => {
    let background = '';

    switch (color) {
      case 'yellow':
        background = '#FFE100';
        break;
      case 'gray':
        background = '#EDF1FE';
        break;
      case undefined:
        background = '#4872F2';
        break;
      default:
        background = color;
        break;
    }

    let fontColor = '';

    switch (color) {
      case 'yellow':
        color = '#3C3C3C';
        break;
      case 'gray':
        fontColor = '#4872F2';
        break;
      default:
        fontColor = 'white';
        break;
    }

    if (isLoading) {
      fontColor = background;
    }
    return `
            background-color: ${background};
            font-family: var(--font-stack);
            color: ${fontColor};
            border-radius: 4px;
            border: none;
            outline: none;
            line-height: 25px;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            padding: 8px 30.5px;
            cursor: pointer;
            ${isLoading ? 'pointer-events: none;' : ''}
            &:disabled {
              background: #DCDCDC;
              color: #B9B9B9;
              cursor: auto;
            }
            transition: all ${TIME1}ms ${TIME2}ms ${EASING}, box-shadow: .2s ease-in-out;
            &:hover {
              box-shadow: 0px 0px 9px -1px ${background};
            }
            `;
  }}
  position: relative;

  &.success {
    border-radius: 50%;
    position relative;
		background green;
		width: 41px;
    height: 41px;
    padding: 0;
		animation none;
		transition all ${TIME1}ms ${EASING};
    color: transparent;
      &::before, &::after {
        content '';
        display inline-block;
        position absolute;
        height 3px;
        background #fff;
        transform-origin 0% 50%;
        z-index 10;
        animation ${showPseudos};
        opacity 0;
        left 48%;
        bottom 0.67rem;
      }
        
      &::before {
        width 10px;
        left: 46%;
        transform rotate(-135deg);
      }
        
      &::after {
        margin-left -3px;
        width 20px;
        transform rotate(-45deg);
      }
  }
`;

export default function PrimaryButtonComponent({
  children,
  ...props
}) {
  return (
    <PrimaryButton {...props}>
      {children}
      {props.isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </PrimaryButton>
  );
}
