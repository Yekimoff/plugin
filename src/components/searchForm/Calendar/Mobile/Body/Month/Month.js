import React from 'react';
import styled from 'styled-components';
import Head from './Head';
import Body from './Body';

const Wrapper = styled.div`
  padding: 10px;
`;

const Month = ({direction, testChange, ...props}) => {
  return (
    <Wrapper>
      <Head value={props.value} />
      <Body focus={direction} days={props.days} testChange={testChange} />
    </Wrapper>
  );
};

export default Month;
