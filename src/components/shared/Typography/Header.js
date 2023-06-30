//eslint-disable-next-line
import styled, { css } from 'styled-components';

const Size1 = css`
  font-size: 36px;
  line-height: 44px;
  @media (max-width: 1024px) {
    font-size: 32px;
    line-height: 40px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const Size2 = css`
  font-size: 30px;
  line-height: 32px;
  font-weight: 600;
  @media (max-width: 1024px) {
    font-size: 24px;
    line-height: 32px;
  }
  @media (max-width: 767px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Size3 = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  @media (max-width: 1024px) {
    font-size: 24px;
    line-height: 32px;
  }
  @media (max-width: 767px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Size4 = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 32px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const Header = styled.span`
  display: block;
  font-style: normal;
  font-weight: bold;
  @media (max-width: 767px) {
    font-weight: 600;
  }
  ${({ theme, ...props }) => {
    const sizeStyles = getSize(props.size);
    const color = getColor(theme, props.color);

    return `
            ${sizeStyles}
            font-family: ${theme.fonts.regular};
            color: ${color};
        `;
  }}
`;

function getSize(size) {
  switch (size) {
    case 'h3':
      return Size3;
    case 'h2':
      return Size2;
    case 'h4':
      return Size4;
    case 'h1':
    default:
      return Size1;
  }
}

function getColor(theme, color) {
  switch (color) {
    case 'gray':
      return theme.colors.gray;
    case 'blue':
      return theme.colors.main;
    case 'dark-gray':
      return theme.colors.darkGray;
    case 'black':
    case undefined:
      return theme.colors.blackGray;
    default:
      return color;
  }
}

export default Header;
