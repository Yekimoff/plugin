import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-sizing: border-box;
  border-radius: 10px;
  padding: ${({ padding }) => (padding ? `${padding}px` : '24px')};
  ${({ theme }) => `
      ${theme.max('767px')} {
        padding: 14px;
      }
  `}
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
`;

export default Block;