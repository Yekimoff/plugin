import React from 'react';
import styled, { keyframes } from 'styled-components';

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
    width: 18px;
    height: 18px;
    margin: auto;
    border-top: 2px solid grey;
    border-right: 2px solid grey;
    border-bottom: 2px solid grey;
    border-left: 2px solid lightgray;
  }
`;

const ButtonLoader = ({ children, isLoading }) => <>{!isLoading ? children : <Spinner />}</>;

export default ButtonLoader;
