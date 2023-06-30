import Text from './Typography';
import React from 'react';
import styled from 'styled-components';
import Field from './Field';
import * as Helper from '../../utils';
import _ from 'lodash';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ToolTipContainer = styled.div`
  position: absolute;
  bottom: 70px;
  left: 0px;
  z-index: 4;
  transition: 1s;
`;

const ToolTip = styled.div`
  position: relative;
  width: 206px;
  background: #edf1fe;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0px 5px 19px 0px rgba(41, 41, 42, 0.04);

  box-shadow: 0px 4px 11px 0px rgba(0, 0, 0, 0.12);
`;

const StyledText = styled(Text)`
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
`;

const BottomText = styled(StyledText)`
  margin-top: 10px;
  display: block;
  & > strong {
    color: #4872f2;
    font-weight: normal;
    cursor: pointer;
  }
`;

const StyledField = styled(Field)`
  width: 100%;
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

const NameTooltip = ({ onClickSuggest, ...rest }) => {
  const [isShown, setIsShown] = React.useState(false);
  const [engValue, setEngValue] = React.useState('');
  const ref = React.useRef(null);

  const handleClickSuggest = () => {
    onClickSuggest(engValue, rest.name);
    setIsShown(false);
  };

  const checkInputValue = React.useCallback(
    _.debounce((value) => {
      if (value && value !== '') {
        const latin = /^[A-Za-z0-9]*$/;
        if (!latin.test(value)) {
          setEngValue(Helper.translateToLatin(value).toUpperCase());
          setIsShown(true);
        } else {
          setIsShown(false);
        }
      }
    }, 200),
    []
  );


  React.useEffect(() => {
    checkInputValue(rest.value);
  }, [rest.value]);

  const text = `${rest.label} пассажира вводится латинскими буквами. Использование кириллицы невозможно`;

  return (
    <Container ref={ref}>
      <StyledField {...rest} />
      {!!isShown && (
        <ToolTipContainer>
          <ToolTip>
            <StyledText>{text}</StyledText>
            {engValue !== '' && (
              <BottomText>
                Заменить на:{' '}
                <strong onClick={handleClickSuggest}>{engValue}</strong>
              </BottomText>
            )}
          </ToolTip>
          <Triangle />
        </ToolTipContainer>
      )}
    </Container>
  );
};

export default NameTooltip;
