import styled from 'styled-components';
import Icon from './calendareArrow';

/** Calendare Table */
export const BaseCalendarWrapper = styled.div`
  min-height: 300px;
  position: relative;
`;

export const TableContainer = styled.table`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  text-align: center;
  border-collapse: collapse;
`;

export const Body = styled.tbody`
  color: ${({ theme: { colors } }) => colors.blackGray};
`;
export const Head = styled.thead`
  color: ${({ theme: { colors } }) => colors.gray};
`;

export const DayOfWeek = styled.td`
  height: 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  user-select: none;
`;



export const DayCell = styled.td`
  user-select: none;
  width: 50px;
  height: 40px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  &:hover {
    background: ${({ theme: { colors } }) => colors.lightBlue};
    border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  }
  &:focus {
    background: ${({ theme: { colors } }) => colors.lightBlue};
    border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  }
  ${({ disabled, theme: { colors } }) =>
    !disabled
      ? ``
      : `
        user-select: unset;
        cursor: context-menu;
        color: ${colors.gray};
        &:hover{
            background: none;
        }
    `}

  ${({ today, theme: { borderRadius } }) =>
    !today
      ? ``
      : `
        cursor: pointer;
        background: #F2F2F2;
        border-radius: ${borderRadius};
        &:hover{
            background: #F2F2F2;
        }
    `}
    ${({ isBetween, theme: { colors } }) =>
    !isBetween
      ? ``
      : `
        background: ${colors.lightBlue};
    `}
    ${({ active, theme: { colors, borderRadius } }) =>
    !active
      ? ``
      : `
        background: ${colors.main};
        color: ${colors.white};
        border-radius: ${borderRadius};
        &:hover{
            background: ${colors.main};
        }
    `}
`;

/** Month select */

export const SelectWrapper = styled.ul`
  list-style-type: none;
  text-alight: left;
  position: absolute;
  top: -20%;
  margin: 0;
  padding: 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1),
    0px 15px 20px rgba(16, 16, 16, 0.15);
  ${({ theme: { colors, fonts, borderRadius } }) => `
        list-style-type: none;
        font-family: ${fonts.regular};
        color: ${colors.black};
        border-radius: ${borderRadius};
        background: ${colors.white};
    `}
  & > div > span,li {
    padding-left: 12px;
    width: 132px;
  }
`;

export const SelectYear = styled.span`
  display: inline-block;
  background: #f7f7f7;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  padding: 4px 0 4px 12px;
`;


export const SelectMonth = styled.li`
  ${({ active, theme: { colors } }) => `
        cursor: pointer;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        padding: 8px 0 8px 12px;
        position: relative;
        text-transform: capitalize;
        & > svg {
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            fill: ${colors.main};
            ${!active && 'display: none;'}
        }
    `}
`;

export const TableOverlay = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
`;

/** Arrow */
export const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;

  @media (max-width: 425px) {
    width: 10px;
    height: 15px;
    display:none;
  }
`;

export const ArrowButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 112px;
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background: transparent;
  border: 1px solid ${({ theme: { colors } }) => colors.blue};
  outline: none;

  @media (max-width: 525px) {
    width: 20px;
    height: 20px;
   
  }
`;


export const ArrowButtonIcon = styled(Icon)`
  width: 9px;
  height: 16px;
  fill: ${({ theme: { colors } }) => colors.blue};
  transform: translateX(1px);
  &.reverse {
    transform: rotate(180deg) translateX(2px);
  }

  @media (max-width: 425px) {
    width: 6px;
    height: 13px;
  }
`;

/** Double view */
export const DoubleViewWrapper = styled.div`
  display: flex;
  & .calendar-first-table {
    margin-right: 20px;
  }
  @media (max-width: 425px) {
   flex-direction:column;
  }
`;

/** Simple view */

export const SimpleViewWrapper = styled.div`
  display: flex;
`;
