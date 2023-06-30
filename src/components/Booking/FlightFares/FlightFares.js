import React from 'react';
import RadioButtonCategoryGroup from './RadioButtonCategory';
import InfoBlock from '../InfoBlock';
import { Header, Text } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getBookingFaresState, selectFare } from '../../../store/booking';
// import ReactGA from 'react-ga4';
import * as Helper from '../../../utils';
import CrossIconSrc from '../../../assets/media/tariff-features/cross.svg';
import CheckIconSrc from '../../../assets/media/tariff-features/check.svg';
import RubleIconSrc from '../../../assets/media/tariff-features/ruble.svg';
import { ReactComponent as InfoIcon } from '../../../assets/media/shared/info-icon.svg';
// import { TariffsInfoModal } from '@components/common/Modals';

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  @media (max-width: 767px) {
    padding: 0 14px;
  }
`;

const Body = styled.div`
  margin-top: 15px;
  @media (max-width: 1023px) {
    margin-top: 10px;
  }
`;

const FeatureWrapper = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 5px;
  }
`;

const Wrapper = styled(InfoBlock)`
  padding: 24px 0;
  @media (max-width: 767px) {
    padding: 20px 0;
  }
`;

const Title = styled(Header)``;

const Description = styled.div`
  padding: 0 24px;
  ${Text} {
    color: #3c3c3c;
  }
  @media (max-width: 767px) {
    padding: 0 14px;
    ${Text} {
      color: ${({ theme }) => theme.colors.darkGray};
    }
  }
`;

const ImageWrapper = styled.div`
  width: 14
  heght: 12;
`;

const NotificationWrapper = styled.div`
  background: #edf1fe;
  border: 1px solid #4872f2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 14px 19px;
  margin: 0 24px;
  margin-top: 20px;
  @media (max-width: 767px) {
    margin: 14px 14px 0 14px;
  }
`;

const CheckIcon = () => (
  <ImageWrapper>
    <img src={CheckIconSrc} alt="" height={18} width={18} />
  </ImageWrapper>
);

const CrossIcon = () => (
  <ImageWrapper>
    <img src={CrossIconSrc} alt="" height={18} width={18} />
  </ImageWrapper>
);

const RubleIcon = () => (
  <ImageWrapper>
    <img src={RubleIconSrc} alt="" height={18} width={18} />
  </ImageWrapper>
);

function getIcon(x) {
  switch (x) {
    case 'Included':
      return <CheckIcon />;
    case 'NotOffered':
      return <CrossIcon />;
    case 'AtCharge':
      return <RubleIcon />;
  }
}

const InfoButton = styled.button.attrs({ type: 'button' })`
  appearance: none;
  outline: none;
  border: none;
  background: transparent;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #4872f2;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > svg {
    margin-right: 6.5px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const TariffName = styled(Text)`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  display: block;
`;
const TariffPrice = styled(TariffName)`
  color: #4872f2;
  margin-top: 5px;
`;

const InfoButtonMobile = styled(InfoButton)`
  padding: 0 14px;
  margin-top: 15px;
  @media (max-width: 767px) {
    display: flex;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const Tarifs = () => {
  const dispatch = useDispatch();
  const fares = useSelector(getBookingFaresState);
  const [open, setOpen] = React.useState(false);

  const formattedItems = fares.items.map((item) => ({
    data: {
      price: item.extraPrice,
      name: item.name ? item.name : '',
      upsaleIndex: item.upsellIndex,
      prices: item.prices,
      extraCharge: item.extraCharge,
    },
    label: createLabel(item.name, item.extraPrice),
    features: item.features || [],
  }));
  return (
    <Wrapper>
      <Head>
        <Title size="h4">Тариф перелета</Title>
        <InfoButton onClick={() => setOpen(true)}>
          {' '}
          <InfoIcon /> <span>Подробнее о тарифах</span>
        </InfoButton>
      </Head>
      <Body>
        <Description>
          <Text>Выберите тариф авиаперелета, единный для всех пассажиров.</Text>
        </Description>
        <RadioButtonCategoryGroup
          type="button"
          items={formattedItems}
          onChange={(data) => {
            // ReactGA.event({
            //   category: 'Booking',
            //   action: 'flights_booking_tariff_change',
            // });
            dispatch(selectFare(data.upsaleIndex));
          }}
          renderLabel={(x) => {
            const price = x.prices.reduce(
              (acc, x) => acc + x.total * x.count,
              0
            );
            return (
              <>
                <TariffName>{x.name}</TariffName>
                <TariffPrice>{Helper.formatPrice(price)}</TariffPrice>
              </>
            );
          }}
          renderFeature={(feature) => {
            return (
              <FeatureWrapper>
                {getIcon(feature.applicability)}
                {getDescription(
                  feature.type,
                  feature.applicability,
                  feature.shortDescriptionRus || feature.descriptionRus
                )}
              </FeatureWrapper>
            );
          }}
        />
        <InfoButtonMobile onClick={() => setOpen(true)}>
          {' '}
          <InfoIcon /> <span>Подробнее о тарифах</span>
        </InfoButtonMobile>
        {fares.notificationVisibility && (
          <NotificationWrapper>
            <Text size="small">
              Обращаем внимание, в данном тарифе выбранные страховка и
              дополнительные услуги могут быть недоступны. Пожалуйста, добавьте
              заново необходимые Вам услуги.
            </Text>
          </NotificationWrapper>
        )}
        {/* <TariffsInfoModal
          fares={fares.items}
          open={open}
          onClose={() => setOpen(false)}
        /> */}
      </Body>
    </Wrapper>
  );
};

function createLabel(name, extraPrice) {
  const formattedPrice =
    extraPrice > 0 ? `+${Helper.formatPrice(extraPrice)}` : '';
  return name ? `${name} ${formattedPrice}` : formattedPrice;
}

function getDescription(
  type,
  applicability,
  shortDescription
) {
  let descArr = ['', '', ''];
  switch (type) {
    case 'Baggage':
      descArr = [`Багаж: ${shortDescription}`, 'Багаж платный', 'Без багажа'];
      break;
    case 'CarryOn':
      descArr = [
        `Ручная кладь: ${shortDescription}`,
        'Ручная кладь платно',
        'Без ручной клади',
      ];
      break;
    case 'Exchange':
      descArr = ['Обмен билета', 'Обмен билета платный', 'Без обмена'];
      break;
    case 'Refund':
      descArr = ['Возврат билета', 'Возврат билета платный', 'Без возврата'];
      break;
  }
  switch (applicability) {
    case 'Included':
      return descArr[0];
    case 'AtCharge':
      return descArr[1];
    case 'NotOffered':
      return descArr[2];
  }
}

export default Tarifs;
