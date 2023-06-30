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

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
  border-radius: 4px;
`;

const OutlinedButton = styled.button`
  ${({
  backgroundColor,
  selected,
  color,
  template,
  isLoading,
}) => {
    let mainColor = color || '#3C3C3C';
    let background = selected ? 'x' : backgroundColor || 'transparent';
    let fontColor = '#4872F2';
    let borderColor = '#4872F2';

    if (template === 'gray') {
      mainColor = '#C4C4C4';
      background = 'transparent';
      fontColor = '#3C3C3C';
      borderColor = '#C4C4C4';
    }

    return `
            min-width: 100px;
            font-family: var(--font-stack);
            border-radius: 4px;
            background: ${selected ? background : 'transparent'};
            color: ${fontColor};
            border: 1px solid ${selected ? 'transparent' : borderColor};
            outline: none;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 18px;
            padding: 7px 16px;
            cursor: pointer;
            position: relative;

            ${isLoading ? 'pointer-events: none;' : ''}

            &:disabled {
                cursor: not-allowed;
                background: transparent;
                color: #B9B9B9;
                border: 1px solid #B9B9B9;
            }
            &:active {
                color: ${mainColor};
                border: 1px solid ${mainColor};
                background-color: ${background};
            }
            &:hover{
              box-shadow: 0 0 9px -1px #4872F2;
            }
        `;
  }}
`;

export default function OutlinedButtonComponent({
  children,
  ...props
}) {
  return (
    <OutlinedButton {...props}>
      {children}
      {props.isLoading && (
        <Layer>
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        </Layer>
      )}
    </OutlinedButton>
  );
}


