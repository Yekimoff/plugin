import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import Fields from './Fields';
import Footer from "../Footer"
const Wrapper = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  background: white;
`;

const Head= () => {
  return (
    <Wrapper>
      <Title />
      <Fields />
      <Footer />

    </Wrapper>
  );
};

export default Head;
