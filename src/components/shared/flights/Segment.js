import React from 'react';
import DesktopTemplate from './DesktopSegment';
import MobileTemplate from './MobileSegment';
import {useMediaQuery} from 'react-responsive';

const Segment = (props) => {
  const isLaptopOrBigTablet = useMediaQuery({ maxWidth: 1024 });
  return isLaptopOrBigTablet ? (
    <MobileTemplate {...props} />
  ) : (
    <DesktopTemplate {...props} />
  );
};

export default Segment;