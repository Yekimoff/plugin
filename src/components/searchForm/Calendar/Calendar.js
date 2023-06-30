import React from 'react';
import DesktopTemplate from './Desktop';
import { useMediaQuery } from 'react-responsive';
import MobileTemplate from './Mobile';

const Calendar = (props) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return  (
    isMobile ? (
        <MobileTemplate {...props} />
      ) : (
        <DesktopTemplate {...props} />
      ))
};

export default Calendar;
