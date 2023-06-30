//eslint-disable-next-line
import styled from 'styled-components';

const Span = styled.span`
  ${({ theme, ...props }) => {
    const weight = getFontWeight(props.bold, props.fontWeight);
    const size = getSize(props.size);
    const lineHeight = getLineHeight(props.size);
    const color = getColor(theme, props.color);
    return `
            font-family: ${theme.fonts.regular};
            font-style: normal;
            font-weight: ${weight};
            font-size: ${size};
            line-height: ${lineHeight};
            color: ${color};
        `;
  }}
`;

function getSize(size) {
  switch (size) {
    case 'small':
      return '12px';
    case 'big':
      return '16px';
    case undefined:
    case 'normal':
      return '14px';
    default:
      return `${size}px`;
  }
}
function getLineHeight(size) {
  switch (size) {
    case 'small':
      return '16px';
    case 'big':
      return '20px';
    case undefined:
    case 'normal':
      return '18px';
    default:
      return `${size + 4}px`;
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
    case undefined: {
      return theme.colors.blackGray;
    }
    default:
      return color;
  }
}

function getFontWeight(bold, weight) {
  if (bold) return 'bold';
  if (weight) return weight;
  return 'normal';
}
export default Span;
