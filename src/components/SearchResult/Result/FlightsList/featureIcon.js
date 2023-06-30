import React from 'react';
import styled from 'styled-components';
import IconWithPopover from './IconWithPopover';
import refundSrc from '../../../../assets/media/flight-search/features/refund.svg';
import exchangeSrc from '../../../../assets/media/flight-search/features/exchange.svg';
import noRefundSrc from '../../../../assets/media/flight-search/features/no-refund.svg';
import noExchangeSrc from '../../../../assets/media/flight-search/features/no-exchange.svg';
import refundWithChargeSrc from '../../../../assets/media/flight-search/features/refund-with-charge.svg';
import exchangeWithChargeSrc from '../../../../assets/media/flight-search/features/exchange-with-charge.svg';
 
const Image = styled.img.attrs({ width: 24, height: 24, alt: '' })``;


export default function featureIcon(feature) {
  switch (feature.type) {
    case 'Refund': {
      switch (feature.style) {
        case 'gray':
          return (
            <IconWithPopover tip={feature.content}>
              <Image src={refundSrc} />
            </IconWithPopover>
          );
        case 'yellow':
          return (
            <IconWithPopover tip={feature.content}>
              <Image src={refundWithChargeSrc} />
            </IconWithPopover>
          );
        case 'red':
          return (
            <IconWithPopover tip={feature.content}>
              <Image src={noRefundSrc} />
            </IconWithPopover>
          );
        default:
          return null;
      }
    }
    case 'Exchange': {
      switch (feature.style) {
        case 'gray':
          return (
            <IconWithPopover tip={feature.content}>
              <Image src={exchangeSrc} />
            </IconWithPopover>
          );
        case 'yellow':
          return (
            <IconWithPopover tip={feature.content}>
              <Image src={exchangeWithChargeSrc} />
            </IconWithPopover>
          );
        case 'red':
          return (
            <IconWithPopover tip={feature.content}>
              <Image src={noExchangeSrc} />
            </IconWithPopover>
          );
        default:
          return null;
      }
    }
    default:
      return null;
  }
}
