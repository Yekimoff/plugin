import React from 'react';
import {Text} from '../../shared';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getPriceDetail, getSelectedFare } from '../../../store/booking';
import * as Helper from '../../../utils';
import AnimatedNumber from 'animated-number-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.lightGray};
  margin: 24px 0;
  @media (max-width: 1024px) {
    margin: 20px 0;
  }
`;

const PassengerPrices = styled(TransitionGroup).attrs({
  className: 'price-list',
  mode: 'ease-in-out',
})`
  overflow: hidden;
  margin: 24px 0;
  & > div {
    margin-bottom: 10px;
  }
  & > :last-child {
    margin-bottom: 0;
  }
  padding: 0 24px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  &.price-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  &.price-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: transform 500ms, opacity 300ms;
  }
  &.price-exit {
    transform: translateX(0);
    opacity: 1;
  }
  &.price-exit-active {
    opacity: 0;
    transform: translateX(100%);
    transition: transform 500ms, opacity 500ms;
  }
`;

const Wrapper = styled.div``;
const WrapperWithPadding = styled.div`
  padding: 0 24px;
`;

const Title = styled(Text)`
  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PassengerPrice = () => {
  const { total, detailList } = useSelector(getPriceDetail);
  const fare = useSelector(getSelectedFare);

  return (
    <Wrapper>
      <WrapperWithPadding>
        <Title fontWeight="600" size="big">
          Тариф{' '}
          <Title fontWeight="600" size="big" color="blue">
            {fare.name}
          </Title>
        </Title>
      </WrapperWithPadding>
      <PassengerPrices>
        {detailList.map((value) => (
          <CSSTransition key={value.id} timeout={500} classNames="price">
            <PriceContainer className="price">
              <Row>
                <Text>{value.description}</Text>
                <Text>
                  {value.quantity > 1 && `${value.quantity} X `}{' '}
                  {Helper.formatPrice(value.cost)}
                </Text>
              </Row>
            </PriceContainer>
          </CSSTransition>
        ))}
      </PassengerPrices>
      <Separator />
      <WrapperWithPadding>
        <Row>
          <Text fontWeight="600" color="#3C3C3C">
            Итог
          </Text>
          <Text fontWeight="600" color="blue">
            <AnimatedNumber
              duration={500}
              value={total}
              formatValue={(value) => Helper.formatPrice(value)}
            />
          </Text>
        </Row>
      </WrapperWithPadding>
    </Wrapper>
  );
};

export default PassengerPrice;
