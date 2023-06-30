import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Text from '../Typography';

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  padding: 7px 0;
  min-width: 120px;
  box-sizing: border-box;
  position: absolute;
  background: #ffffff;
  border-radius: 0px 0px 4px 4px;
  text-align: left;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  top: 100%;
  & > ${Text} {
    display: block;
    padding: 7px 12px;
    cursor: pointer;
    &.selected {
      background: #f2f2f2;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Arrow = styled.svg`
  height: 7.65px;
  width: 12px;
  //   margin-left: 7px;
  fill: ${({ theme: { colors } }) => colors.main};
  cursor: pointer;
  &:hover {
    fill: ${({ theme: { colors } }) => colors.darkGray};
  }
`;

const DoubleArrow = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7px;
`;

const MonthSelect = ({
  value,
  onSelect,
  onIncrease,
  onDecrease,
}) => {
  const [isVisible, setVisiblity] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleCLickOutside = (e) => {
      if (ref.current) {
        if (!ref.current.contains(e.target)) {
          setVisiblity(false);
        }
      }
    };
    window.addEventListener('mousedown', handleCLickOutside);
    return () => window.removeEventListener('mousedown', handleCLickOutside);
  }, [ref, setVisiblity]);

  const monthsList = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const handleUp = () => {
    onIncrease();
  };

  const handleDown = () => {
    onDecrease();
  };

  const handleClick = () => {
    setVisiblity(!isVisible);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setVisiblity(false);
  };

  return (
    <Wrapper ref={ref}>
      <InputContainer>
        <Text onClick={handleClick}>{monthsList[value]}</Text>
        <DoubleArrow>
          <Arrow onClick={handleUp}>
            <path d="M3.25892 0.817974C3.65585 0.379862 4.34415 0.379862 4.74108 0.817974L7.68186 4.06388C8.2642 4.70664 7.80811 5.73529 6.94077 5.73529H1.05923C0.191888 5.73529 -0.2642 4.70664 0.318144 4.06388L3.25892 0.817974Z" />
          </Arrow>

          <Arrow onClick={handleDown}>
            <path d="M3.25892 5.18203C3.65585 5.62014 4.34415 5.62014 4.74108 5.18203L7.68186 1.93612C8.2642 1.29336 7.80811 0.264706 6.94077 0.264706H1.05923C0.191888 0.264706 -0.2642 1.29336 0.318144 1.93612L3.25892 5.18203Z" />
          </Arrow>
        </DoubleArrow>
      </InputContainer>
      {isVisible && (
        <Container>
          {monthsList.map((month, key) => (
            <Text
              onClick={() => handleSelect(key)}
              className={key === value ? 'selected' : ''}
              key={key}
            >
              {month}
            </Text>
          ))}
        </Container>
      )}
    </Wrapper>
  );
};

export default MonthSelect;
