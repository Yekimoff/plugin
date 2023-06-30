import React, { useMemo } from "react";

import Calendar from "./Calendar";
import styled from "styled-components";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Icon } from "../../assets/media/flight-search/calendar.svg";
import { changeDates } from "../../store/slices/FligthsSlice";
import { useFocus } from "./useFormFocus";

const Container = styled.div`
  @media (max-width: 1169px) {
    width: 49%;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
  }
`; 

const CalendarIcon = styled(Icon)`
  width: 15px;
  height: 15px;
  position: absolute;
  bottom: 9px;
  right: 12px;
  fill: ${({ theme: { colors } }) => colors.blue};
  cursor: pointer;
  &:hover {
    fill: ${({ theme: { colors } }) => colors.darkGray};
  }
  & > path {
    pointer-events: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const Cross = styled.span`
  position: absolute;
  bottom: 9px;
  right: 12px;
  width: 12px;
  height: 12px;
  cursor: pointer;
  &:hover {
    &:before,
    &:after {
      background-color: ${({ theme: { colors } }) => colors.darkGray};
    }
  }
  &:before,
  &:after {
    position: absolute;
    content: " ";
    height: 14px;
    width: 2px;
    right: 3.5px;
    bottom: 0.5px;
    background-color: ${({ theme: { colors } }) => colors.main};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button.attrs({ type: "button" })`
  display: block;
  position: relative;
  height: 60px;
  border: none;
  outline: none;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 0 0 2px #4872f2;
  transition: 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px #ff6d00;
    z-index: 2;
  }
  @media (max-width: 1169px) {
    width: 49%;
    border-left: none;
    border-radius: 4px;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  appearance: none;
  font-size: 16px;
  line-height: 20px;
  color: #3c3c3c;
  padding: 31px 15px 5px 12px;
  box-sizing: border-box;
  pointer-events: none;
  width: 163px;
  @media (max-width: 1169px) {
    width: 100%;
    border-left: none;
    border-radius: 4px;
  }
`;

const Label = styled.label`
  color: #b9b9b9;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  transform-origin: top left;
  transform: translate(12px, 9px) scale(0.75);
  position: absolute;
  ${({ focus }) => (focus ? "transform: translate(12px,9px) scale(.75);" : "")}
`;

const DatePicker = () => {
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const { firstDate, secondDate } = useSelector((x) => x.flights.searchParams);

  const { focus, setFocus } = useFocus();

  React.useEffect(() => {
    if (focus === "backward" && ref.current !== null) {
      ref.current.focus();
    }
  }, [focus]);

  const handleChange = (values) => {
    if (Array.isArray(values)) {
      dispatch(changeDates({ firstDate: values[0], secondDate: values[1] }));
    }
  };

  const testChange = (item, direction) => {
    direction === "forward"
      ? dispatch(changeDates({ firstDate: moment.utc(item), secondDate }))
      : dispatch(changeDates({ firstDate, secondDate: moment.utc(item) }));
  };

  const handleCrossClick = (e) => {
    e.stopPropagation();
    dispatch(changeDates({ firstDate, secondDate: null }));
    // dispatch(setReturn(true));
  };

  const handleTypeChange = (type) => {
    if (type !== calendareType) {
      // setReturn(type === 'default');
      if (type === "default") {
        dispatch(changeDates({ firstDate, secondDate: null }));
      }
    }
  };

  const calendareType = useMemo(() => "range", []);

  const handleForward = () => {
    setFocus("forward");
  };

  const handleBack = () => {
    setFocus("backward");
  };

  const handleClose = () => {};

 
  return (
    <Container>
      <ButtonContainer>
        <Button onClick={handleForward}>
          <Label focus={focus === "forward" || secondDate !== null}>Туда</Label>
          <Input value={formatDate(firstDate)} />
          <CalendarIcon />
        </Button>

        <Button onClick={handleBack} ref={ref}>
          <Label focus={focus === "backward" || secondDate !== null}>
            Обратно
          </Label>
          <Input value={formatDate(secondDate)} />
          {!secondDate ? (
            <CalendarIcon />
          ) : (
            <Cross className="tui-date-clear" onClick={handleCrossClick} />
          )}
        </Button>
      </ButtonContainer>

      <Calendar
        direction={focus}
        setDirection={setFocus}
        open={focus === "forward" || focus === "backward"}
        onClose={handleClose}
        onChange={handleChange}
        values={[firstDate, secondDate]}
        onTypeChange={handleTypeChange}
        type={calendareType}
        testChange={testChange}
      />
    </Container>
  );
};

function formatDate(str) {
  return str !== "" && str !== null ? moment(str).format("D MMM") : "";
}

export default DatePicker;
