import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: 600;
  color: black;
  text-transform: uppercase;
  font-famuly: Open sans;
`;

const Head= ({ value }) => {
  return (
    <Wrapper>
      <Title>{value}</Title>
    </Wrapper>
  );
};

export default Head;
