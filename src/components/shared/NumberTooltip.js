import Text from './Typography';
import React from 'react';
import InputMask from 'react-input-mask';
import styled from 'styled-components';


const Container = styled.div`
  position: relative;
`;

const ToolTipContainer = styled.div`
  position: absolute;
  bottom: 75px;
  left: 0px;
  z-index: 4;
  transition: 1s;
`;

const ToolTip = styled.div`
  position: relative;
  width: 206px;
  height: 174px;
  display: flex;
  flex-direction: column;
  background: #edf1fe;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 7px 20px;
  box-shadow: 0px 5px 19px 0px rgba(41, 41, 42, 0.04);

  box-shadow: 0px 4px 11px 0px rgba(0, 0, 0, 0.12);
`;

const Triangle = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #edf1fe; ;
`;

const Title = styled(Text)`
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: #3c3c3c;
  margin-bottom: 10px;
  margin-left: -10px;
`;

const Ol = styled.ol`
  margin: 0px;
  padding: 0px;
`;

const Element = styled.li`
  margin: 0px;
  padding: 0px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
  margin-bottom: 5px;
  font-weight: 500;
`;

const NumberTooltip = ({
  handleChange,
  value,
  key,
  type,
  children,
  handleBlur,
  className,
  mask,
}) => {
  const [isShown, setIsShown] = React.useState(false);

  const onFocus = () => {
    if (type === 'BirthCertificate' || typeof mask === 'object') {
      setIsShown(true);
    }
  };

  const onBlur = (props) => {
    handleBlur(props);
    setIsShown(false);
  };

  const maskWithoutBirhCertificate = typeof mask === 'object' ? '' : mask;
  

  return (
    <Container>
      <InputMask
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        mask={
          type
            ? getNumberInputMask(type)
            : mask
              ? maskWithoutBirhCertificate
              : ''
        }
        value={value}
        name={`documents.${key}.number`}
        className={className}
      >
        {children}
      </InputMask>
      {!!isShown && (
        <ToolTipContainer>
          <ToolTip>
            <Title>Порядок ввода: </Title>
            <Ol>
              <Element>
                Римская цифра, вводится латинскими буквами I, V, Х (в английской
                раскладке клавиатуры).
              </Element>
              <Element>Две буквы кириллицей.</Element>
              <Element>Шесть цифр.</Element>
            </Ol>
            <Title style={{ marginTop: 10 }}>Пример VII-ЛЛ №905784</Title>
            <Triangle />
          </ToolTip>
        </ToolTipContainer>
      )}
    </Container>
  );
};



function getNumberInputMask(type) {
  const ru = /[A-Za-zА-Яа-я0-9]/;
  const eng = /[A-Za-z]/;
  const digit = /[0-9]/;

  switch (type) {
    case 'RussianFederationPassport':
      return '9999-999999';
    case 'InternationalPassport':
      return '99 999999';
    case 'BirthCertificate':
      return [
        eng,
        eng,
        '-',
        ru,
        ru,
        ' ',
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
      ];
    default:
      return '';
  }
}

export default NumberTooltip;
