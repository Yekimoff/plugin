import React from 'react';
import styled, {keyframes} from 'styled-components';

const heartBeat = keyframes`
0% {
  stroke-dashoffset: -61px;
  
}
50% {
  stroke-dashoffset: -122px;
}
100% {
  stroke-dashoffset: -61px;
}
`;

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const RoundWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Round = styled.svg`
  stroke-dasharray: 122px;
  stroke-dashoffset: -61px;
  animation: ${heartBeat} 1.4s linear reverse infinite,
    ${spin} 0.7s linear infinite;
  width: 100px;
  height: 100px;
  transform: rotate(180deg);
  stroke: ${({ theme: { colors } }) => colors.main};
`;

const RoundIcon = () => (
  <RoundWrapper>
    <Round>
      <circle
        id="c"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        cx="50"
        cy="50"
        r="20"
      />
    </Round>
  </RoundWrapper>
);

export default RoundIcon;