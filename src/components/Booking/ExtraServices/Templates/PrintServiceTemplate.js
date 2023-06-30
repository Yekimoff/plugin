import React from 'react';
import styled from 'styled-components';
import { Text, Button } from '../../../shared';
import * as Helper from '../../../../utils'
import { ReactComponent as PrintIcon } from '../../../../assets/media/addictional-services/print-service.svg';
import { ReactComponent as RecommendIcon } from '../../../../assets/media/addictional-services/for-work.svg';
// import { useModalState } from './context';

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  position: relative;

  @media (max-width: 767px) {
    display: block;
  }
`;

const Content = styled.div`
  width: 100%;
  margin-left: 7px;
  padding-top: 7px;
  @media (max-width: 767px) {
    margin-left: 0;
    padding-top: 0;
  }
`;

const Name = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  position: relative;
`;

const Price = styled(Text)`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #4872f2;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${Name} {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    margin-left: 5px;
  }

  ${Price} {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }

  svg {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileHeadLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const DesktopIcon = styled(PrintIcon)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const Description = styled(Text)`
  display: block;
  margin-bottom: 5px;
  @media (max-width: 767px) {
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
  }
`;

const Action = styled(Button).attrs({ htmlType: 'button' })`
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  padding: 7px 16px;
  min-width: 153px;
  margin-top: 15px;
`;

const Label = styled(RecommendIcon)`
  position: absolute;
  right: -157px;
  top: -3px;
`;

const DesktopLabel = styled(Label)`
  @media (max-width: 1000px) {
    display: none;
  }
`;

const MobileLabel = styled(Label)`
  top: -12px;
  right: -4px;
  @media (min-width: 1000px) {
    display: none;
  }
`;

export default function (props) {
  const handleChange = () => {
    props.onClick(props.index, !props.checked);
  };
  //   const { showModal } = useModalState();

  return (
    <Wrapper>
      <MobileLabel />
      <DesktopIcon />
      <Content>
        <Head>
          <Name>
            Справка о стоимости заказа <DesktopLabel />
          </Name>
          <Price>{Helper.formatPrice(props.amount)}</Price>
        </Head>
        <MobileHead>
          <MobileHeadLeftSide>
            <PrintIcon /> <Name>Справка о стоимости заказа</Name>
          </MobileHeadLeftSide>
          <Price>{Helper.formatPrice(props.amount)}</Price>
        </MobileHead>
        <Description>
          Справка может понадобиться бухгалтерии с вашего места работы для
          компенсации оплаты авиаперелета.
        </Description>
        <Action
          onClick={handleChange}
          color={props.checked ? 'gray' : undefined}
        >
          {!props.checked ? 'Добавить услугу' : 'Убрать услугу'}
        </Action>
      </Content>
    </Wrapper>
  );
}
