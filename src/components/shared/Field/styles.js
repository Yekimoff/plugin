import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  position: relative;
  z-index: 1;
  ${({ focused }) => `
        z-index: ${focused ? 3 : 1};
    `}

  @media(max-width: 767px) {
    width: 100%;
  }
`;



export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const StyledInput = styled.input`
  ${({ width, height, error, theme: { fonts, colors, borderRadius } }) => {
    return `
        font-family: ${fonts.regular};
        color: ${colors.blackGray};
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        background: ${colors.white};
        border: none;
        border: 1px solid ${
          error && error !== '' ? colors.red : colors.lightGray
        };
        box-sizing: border-box;
        border-radius: ${borderRadius};
        outline: none;
        padding: 10px 12px;
        z-index: 1;
        transition: border .2s ease-in-out;
        &:focus {
            z-index: 3;
            border-color:  #c2c2c2;
            outline: none;
            &:hover {
              border-color: #c2c2c2;
            }    
        }
        &:hover {
            z-index: 2;
            border-color: ${error && error !== '' ? colors.red : '#c2c2c2'};
   
        }

        &::-webkit-contacts-auto-fill-button, 
        &::-webkit-credentials-auto-fill-button {
          visibility: hidden;
          position: absolute;
          right: 0;
        }

        &::placeholder {
            color: ${colors.gray};
        }
        ${width && `width: ${width}px;`}
        ${height && `height: ${height}px;`}
    `;
  }}
`;

export const Label = styled.label`
  display: block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme: { colors } }) => colors.darkGray};
  margin-bottom: 4px;
  user-select: none;
`;

export const ErrorText = styled.span`
  position: absolute;
  bottom: -20px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme: { colors } }) => colors.red};
  top: 11px;
  left: 12px;
  pointer-events: none;
`;



export const MaskedInput = styled.button`
  display: inline-block;
  height: ${({ height }) => (height ? height : 40)}px;
  color: ${({ initial, theme: { colors } }) =>
    initial ? '#8e8e8e' : colors.blackGray};
  border-radius: ${({ screen }) => (screen <= 1023 ? 5 : 0)}px;

  ${({ error, width, focus, theme: { colors, borderRadius } }) => `
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    background: ${colors.white};
    border: none;
    border: 1px solid ${error && error !== '' ? colors.red : colors.lightGray};
    
    box-sizing: border-box;
    outline: none;
    padding: 10px 12px;
    z-index: 1;
    transition: border.2s ease-in-out;
    text-align: left;
    cursor: text;
    &:focus {
        z-index: 3;
        border-color: ${colors.blackGray};
        outline: none;
        &:hover {
          border-color:${colors.blackGray};
        }    
    }
    ${focus ? `border-color: ${colors.blackGray};` : ''}
    &:hover {
        z-index: 2;
        border-color: ${error && error !== '' ? colors.red : colors.lightGray};
    }
    &:placeholder {
        color: ${colors.lightGray};
    }
    ${width ? `width: ${width}px;` : 'width:100%'}
    `}
`;
