import React from "react";
import styled from "styled-components";
import paymentImg1 from "../../assets/media/static/paymentImg1.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1170px;
  margin: 0 auto;
  @media screen and (min-width: 768px) and (max-width: 1439px) {

    box-sizing: border-box;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%; //or whatever looks best
    margin: auto; //top and bottom margin can be added for aesthetic effect
    padding: 0;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #3c3c3c;
  display: inline-block;
  text-align: left;
  margin-top: 20px;
  font-family: Open sans;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    font-size: 20px;
    line-height: 26px;
    margin-top: 40px;
    margin-left: 10px;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 16px;
    line-height: 20px;
    margin-left: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  max-width: 1200px;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    margin-top: 0;
    display: block;
  }
`;


const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #2e2e32;
  margin-top: 30px;
  display: block;
  font-family: Open sans;

  & > strong {
    font-weight: 600;
  }

  & > a {
    color: #4872f2;
    text-decoration: none;
    transition: color 0.1s ease-in-out;

    &:hover {
      color: #9e9e9e;
    }
  }

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const StyledUl = styled.ul`
  padding-left: 20px;
  margin: 20px 0 30px 0 & > li {
    margin-bottom: 40px;
  }

  & > :last-child {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    & > li {
      margin-bottom: 30px;
    }
  }
`;

const LiTitle = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  padding: 0;
  margin-top: 40px;
  margin-bottom: 15px;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
  }
`;
const LiParagraph = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  padding: 0;
  margin-top: 15px;
  margin-bottom: 15px;

  & > strong {
    font-weight: 600;
  }

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Li = styled.li`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  font-family: Open Sans;
  font-style: normal;

  &::marker,
  > strong {
    font-weight: 600;
  }

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`;

const Notification = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  padding: 14px;
  background: #fffaec;
  border-radius: 12px;

  & > strong {
    font-weight: 600;
  }

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }
`;
const UlText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  white-space: pre-line;
  max-width: 1150px;
  margin-top: 15px;
  font-family: Open Sans;

  @media screen and (min-width: 768px) and (max-width: 1439px) {
    margin-left: 10px;
    margin-top: 15px;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 14px;
    line-height: 18px;
    margin-left: 0;
    margin-top: 15px;
    max-width: 90%;
  }
`;

const PaymentImg1 = styled.img.attrs({ src: paymentImg1 })`
  margin-right: 48px;
  cursor: pointer;
  height: 529px;
  max-width: 560px;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;

const PaymentInfo = () => {
  return (
    <Container>
      <Column>
        <Title>Оплата заказа</Title>

        <Paragraph>
          Оплата банковскими картами происходит через авторизационный сервер АО
          «Тинькофф Банк» с помощью платежных карт МИР, VISA и MasterCard.
        </Paragraph>
        <StyledUl>
          <Li>
            <LiTitle>
              Если с одного раза не получается оплатить при помощи пластиковой
              карты банка, то что делать?
            </LiTitle>
            <LiParagraph>
              Если ваш платёж не прошел с первого раза, пожалуйста, убедитесь в
              том, что на вашей карте имеется достаточное количество денежных
              средств, она имеет CVV/CVC код. Вы можете попытаться оплатить ваш
              заказ ещё несколько раз, внимательно проверив заполняемые
              реквизиты карты. Не стоит волноваться - система не позволит один и
              тот же заказ оплачивать более одного раза.
            </LiParagraph>
            <LiParagraph>
              Если ни вторая, ни третья попытка не помогла, то необходимо{" "}
              обратиться в службу поддержки вашего банка по указанным на карте{" "}
              данным или воспользоваться другими способами оплаты.
            </LiParagraph>
          </Li>
          <Li>
            <LiTitle>
              Почему деньги списались, а билет не пришел на почту?
            </LiTitle>
            <Notification>
              Внимание! Если ваша маршрутная квитанция не доступна в Личном
              кабинете, а также вы не получили её на адрес вашей электронной
              почты, указанной при бронировании, в течение 30 минут после оплаты
              просим вас незамедлительно связаться с нашей службой поддержки
              через обращение в заказе «Служба поддержки».
            </Notification>
          </Li>
          <Li>
            <LiTitle>
              Если не получается произвести оплату забронированного билета в
              срок, то что делать?
            </LiTitle>
            <LiParagraph>
              Если вы не успеваете оплатить вовремя, то по истечении срока,{" "}
              отведенного на оплату, ваша бронь автоматически аннулируется, о{" "}
              чем вы будете уведомлены по e-mail или через СМС. Для покупки{" "}
              билета вам нужно заново создавать заказ на сайте и бронировать
              новый билет.
            </LiParagraph>
          </Li>
        </StyledUl>
        <Title>Заказ после оплаты</Title>
        <Paragraph>
          После оплаты заказа вы сможете скачать документы и маршрутную
          квитанцию, докупить дополнительные услуги и создать обращение при
          необходимости .{" "}
        </Paragraph>
        <ImageRow>
          <PaymentImg1 />
          <StyledUl>
              <li>
                <Column>
                  <UlText style={{ marginTop: 0 }}>
                    После успешной оплаты и выписки билетов статус позиции
                    сменится на{' '}
                    <span style={{ fontWeight: 'bold' }}>“Выписана”</span>.
                  </UlText>
                  <UlText style={{ color: '#737373' }}>
                    * Если вы видите другой статус, пожалуйста, обратитесь в
                    службу поддержки через кнопку{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      «Служба поддержки»
                    </span>
                    .
                  </UlText>
                </Column>
              </li>
              <li style={{ marginTop: 40 }}>
                <Column>
                  <UlText>
                    Документы по заказу придут на указанную вами почту и будут
                    доступны в деталях заказа по кнопке{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      “Документы по заказу”
                    </span>
                    .
                  </UlText>
                  <UlText>
                    Страховые полиса, чек об оплате и маршрутная квитанция также
                    хранятся в заказе и всегда доступны для скачивания.
                  </UlText>
                </Column>
              </li>
              <li style={{ marginTop: 40 }}>
                <Column>
                  <UlText>
                    Ряд дополнительных услуг также доступен для покупки уже
                    после оплаты заказа.
                  </UlText>
                  <UlText>
                    Добавьте необходимые услуги из списка и внесите доплату за
                    них через кнопку{' '}
                    <span style={{ fontWeight: 'bold' }}>“Доплатить”</span> в
                    шапке заказа.
                  </UlText>
                </Column>
              </li>
              <li style={{ marginTop: 40 }}>
                <Column>
                  <UlText>
                    Все вторичные операции (возврат, обмен и тд) оформляются в
                    обращение через кнопку{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      “Служба поддержки”
                    </span>{' '}
                    в деталях заказа.
                  </UlText>
                 
                </Column>
              </li>
            </StyledUl>
        </ImageRow>
      </Column>
    </Container>
  );
};

export default PaymentInfo;
