import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import Head from './Head';
import Body from './Body';
import Footer from './Footer';
import { CalendareProvider } from './useCalendar';

const StyledPopup = styled.div`
    top:0;
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    border: none;
    border-radius: 0;
    overflow-x: scroll;
    padding: 0;
    display: flex;
    flex: 1;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: white;
    z-index: 100000;

`;


const CalendarComponent = ({
  type = 'default',
  onTypeChange,
  onClose,
  values,
  open,
  direction,
  testChange,
  setDirection,
  ...props
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handlePopupClose = () => {
    document.body.style.overflow = 'auto;';
    setDirection(null);
  };


  return open ? (
    <CalendareProvider
      values={values}
      onClose={handlePopupClose}
      onChange={props.onChange}
      direction={direction}
      setDirection={setDirection}
    >
      <StyledPopup open={true} onClose={handlePopupClose}>
        <Head />
        <Body direction={direction} testChange={testChange}/>
      </StyledPopup>
    </CalendareProvider>
  ) : null;
};

export default CalendarComponent;
