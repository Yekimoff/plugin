import React from 'react';
import { ArrowWrapper, ArrowButton, ArrowButtonIcon } from './styles';


export const Arrow = React.memo(
  ({ reverse = false, onClick }) => {
    const handleClick = (e) => {
      e.preventDefault();
      typeof onClick === 'function' && onClick();
    };
    return (
      <ArrowWrapper>
        <ArrowButton onClick={handleClick}>
          <ArrowButtonIcon className={reverse ? 'reverse' : ''} />
        </ArrowButton>
      </ArrowWrapper>
    );
  }
);
