import styled from 'styled-components';

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.lightGray};
  margin: 24px 0;
  @media (max-width: 1024px) {
    margin: 20px 0;
  }
`;

export default Separator;