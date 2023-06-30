import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useMonth, useCalendareContext } from './context';
import ArrowCheck from './arrowIcon';
import { SelectWrapper, SelectMonth, SelectYear } from './styles';
import 'moment/locale/ru'
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme: { fonts } }) => fonts.regular};
`;

const Text = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  width: 110px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  text-transform: capitalize;
  color: ${({ theme: { colors } }) => colors.blackGray};
  &:hover {
    color: ${({ theme: { colors } }) => colors.main};
  }
`;

const Arrow = styled.svg`
  width: 15px;
  height: 15px;
  margin-left: 7px;
  fill: ${({ theme: { colors } }) => colors.main};
  & > path {
    cursor: pointer;
    &:hover {
      fill: ${({ theme: { colors } }) => colors.darkGray};
    }
  }

`;


export const Month = (props) => {
  const { month, setSelectVisibility, selectVisibility } = useMonth();
  const { handleMonthChange, monthState } = useCalendareContext();
  const selectedDate = useMemo(
    () => monthState.date[props.index].format('MMMM YYYY'),
    [props]
  );

  const handleUp = () => {
    handleMonthChange(month.add(1, 'month').clone(), props.index);
  };

  const handleDown = () => {
    handleMonthChange(month.subtract(1, 'month').clone(), props.index);
  };

  const handleClick = () => {
    setSelectVisibility(true);
  };

  return (
    <Wrapper>
      <Text onClick={handleClick}>{selectedDate}</Text>
      <Arrow>
        <path
          onClick={handleUp}
          d="M6.74407 0.872871C7.14284 0.41241 7.85716 0.41241 8.25593 0.872872L12.5622 5.84535C13.1231 6.49299 12.663 7.5 11.8063 7.5H3.19371C2.33696 7.5 1.87691 6.49299 2.43778 5.84535L6.74407 0.872871Z"
        />
        <path
          onClick={handleDown}
          d="M6.74407 15.1271C7.14284 15.5876 7.85716 15.5876 8.25593 15.1271L12.5622 10.1547C13.1231 9.50701 12.663 8.5 11.8063 8.5H3.19371C2.33696 8.5 1.87691 9.50701 2.43778 10.1547L6.74407 15.1271Z"
        />
      </Arrow>
      {selectVisibility && <MonthSelect {...props} />}
    </Wrapper>
  );
};

const MonthSelect = ({ list, index }) => {
  const { setSelectVisibility } = useMonth();

  const ref = useRef(null);

  useEffect(() => {
    const handleCLickOutside = (e) => {
      if (ref.current) {
        if (!ref.current.contains(e.target)) {
          setSelectVisibility(false);
        }
      }
    };
    window.addEventListener('mousedown', handleCLickOutside);
    return () => window.removeEventListener('mousedown', handleCLickOutside);
  }, [ref, setSelectVisibility]);

  return (
    <SelectWrapper ref={ref}>
      {Object.keys(list).map((year) => {
        return (
          <div>
            <SelectYear key={year}>{year}</SelectYear>
            {list[year].map((props, key) => (
              <SelectMonthItem key={key} {...props} index={index} />
            ))}
          </div>
        );
      })}
    </SelectWrapper>
  );
};

const SelectMonthItem = React.memo(
  ({ date, selected, index }) => {
    const { handleMonthChange } = useCalendareContext();
    const { setSelectVisibility } = useMonth();

    const handleClick = () => {
      handleMonthChange(date, index);
      setSelectVisibility(false);
    };
    return (
      <SelectMonth onClick={handleClick} active={selected}>
        <span>{date.format('MMMM')}</span>
        <ArrowCheck width={15} height={10} />
      </SelectMonth>
    );
  }
);
