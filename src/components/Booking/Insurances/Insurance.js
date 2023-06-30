import React from 'react';
import styled from 'styled-components';
import InfoBlock  from '../InfoBlock';
import { Header, Text } from '../../shared';
import { RoundIcon } from '../../shared/loader';
import Slider from './Slider';
import * as Helper from '../../../utils';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedNumber from 'animated-number-react';
import {
  getInsuranceCalculationRequest,
  getBookingTicketState,
  bookingInsuranceSelector,
  switchInsuranseOfferCheck,
  InsuranceLoadStatus,
} from '../../../store/booking';
import ErrorIconPath from '../../../assets/media/shared/error.svg';
import _ from 'lodash';

const Wrapper = styled(InfoBlock)`
  padding-right: 0px;
  padding-left: 0px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  @media (max-width: 767px) {
    padding: 0 14px;
  }
`;

const Title = styled(Header).attrs({ size: 'h4' })``;

const Body = styled.div`
  margin-top: 15px;

  position: relative;
  min-height: 350px;
  @media (max-width: 1023px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 767px) {
    margin-bottom: 0;
  }
`;

const Description = styled.div`
  padding: 0 24px;
  margin-bottom: 13px;
  ${Text} {
    color: #3c3c3c;

    & > a {
      color: #4872f2;
      text-decoration: none;
    }
  }
`;

const DescktopDescription = styled(Description)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileDescription = styled(Description)`
  padding: 0 14px;
  margin-bottom: 10px;
  & > * {
    margin-bottom: 10px;
    display: block;
    color: #737373 !important;
  }
  & > :last-child {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  background: white;
  z-index: 999;
  left: 0;
`;

const ErrorIcon = styled.img.attrs({ src: ErrorIconPath, alt: 'Ошибка' })`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  @media (max-width: 767px) {
    padding: 0 14px;
  }
`;

const TotalPrice = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 18px;
  }
  & > strong {
    color: #4872f2;
    font-weight: 600;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  & > img {
    margin-right: 10px;
  }
  & > :last-child {
    margin-right: 0;
  }
`;

const ItemsList = styled(Slider)`
  padding: 0 24px;
  margin-top: 20px;
  margin-bottom: 25px;

  @media (max-width: 767px) {
    padding: 0 14px;
  }
`;

const Insurance= () => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });
  const dispatch = useDispatch();
  const { id } = useSelector(getBookingTicketState);
  const { status, list } = useSelector(bookingInsuranceSelector);

  React.useEffect(() => {
    if (inView) {
      dispatch(getInsuranceCalculationRequest(id));
    }
  }, [inView]);
 

  const totalPrice = _(list.offers)
    .filter((item) => item.checked)
    .reduce((acc, x) => acc + x.totalRate.value, 0);

  return (
    <Wrapper ref={ref} id="insurances_block">
      <Head>
        <Title>Ваше страхование</Title>
        <IconsContainer>
          {/* <img alt="alfa" src={alphastrahPath} />
          <img alt="insurion" src={insurionPath} /> */}
        </IconsContainer>
      </Head>
      <Body>
        {status === InsuranceLoadStatus.Loading && (
          <LoaderWrapper>
            <RoundIcon />
          </LoaderWrapper>
        )}
        {status === InsuranceLoadStatus.Failure && <ErrorIcon />}
        {status === InsuranceLoadStatus.Success && (
          <>
            <DescktopDescription>
              <Text>
                Отдых пройдет спокойнее с поддержкой надежной страховой
                компании. Полис обеспечит вам финансовую защиту в случае
                болезни, утраты багажа, отмены поездки и в других непредвиденных
                ситуациях.
              </Text>
            </DescktopDescription>
            <MobileDescription>
              <Text>
                Отдых пройдет спокойнее с поддержкой надежной страховой
                компании.
                <br />
                <br />
                Полис обеспечит вам финансовую защиту в непредвиденных
                ситуациях.
              </Text>
            </MobileDescription>
            <ItemsList
              disabled={false}
              onChange={(code) => {
                dispatch(switchInsuranseOfferCheck(code));
              }}
              items={list.offers}
            />
          </>
        )}
      </Body>
      {status === InsuranceLoadStatus.Success && (
        <Footer>
          <TotalPrice>
            Сумма выбранных страховок:{' '}
            <strong>
              <AnimatedNumber
                duration={500}
                value={totalPrice}
                formatValue={(value) => Helper.formatPrice(value)}
              />
            </strong>
          </TotalPrice>
        </Footer>
      )}
    </Wrapper>
  );
};

export default Insurance;
