import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Text from '../Typography';
import { memoize } from 'lodash';

//TODO сделать переиспользуемый компонент

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  padding: 7px 0;
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
  width: 8px;
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

const ArrowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const getYearList = memoize((year) => {
  let yearWIthoutRemain = year - (year % 10);
  return Array(11)
    .fill(0)
    .map(() => {
      const currentYear = yearWIthoutRemain;
      yearWIthoutRemain++;
      return currentYear;
    });
});

const MonthSelect = ({ year, onSelect }) => {
  const [isVisible, setVisiblity] = useState(false);
  const yearList = getYearList(year);

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

  const handleUp = (e) => {
    onSelect(year + 1);
  };

  const handleDown = (e) => {
    onSelect(year - 1);
  };

  const handleClick = () => {
    setVisiblity(!isVisible);
  };

  const handleListDown = (e) => {
    onSelect(year - 10);
  };

  const handleListUp = (e) => {
    onSelect(year + 10);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setVisiblity(false);
  };

  return (
    <Wrapper ref={ref}>
      <InputContainer>
        <Text onClick={handleClick}>{year}</Text>
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
          <ArrowContainer>
            <Arrow onClick={handleListDown}>
              <path d="M3.25892 0.817974C3.65585 0.379862 4.34415 0.379862 4.74108 0.817974L7.68186 4.06388C8.2642 4.70664 7.80811 5.73529 6.94077 5.73529H1.05923C0.191888 5.73529 -0.2642 4.70664 0.318144 4.06388L3.25892 0.817974Z" />
            </Arrow>
          </ArrowContainer>
          {yearList.map((innerYear) => (
            <Text
              onClick={() => handleSelect(innerYear)}
              className={innerYear === year ? 'selected' : ''}
              key={innerYear}
            >
              {innerYear}
            </Text>
          ))}
          <ArrowContainer>
            <Arrow onClick={handleListUp}>
              <path d="M3.25892 5.18203C3.65585 5.62014 4.34415 5.62014 4.74108 5.18203L7.68186 1.93612C8.2642 1.29336 7.80811 0.264706 6.94077 0.264706H1.05923C0.191888 0.264706 -0.2642 1.29336 0.318144 1.93612L3.25892 5.18203Z" />
            </Arrow>
          </ArrowContainer>
        </Container>
      )}
    </Wrapper>
  );
};

export default MonthSelect;
