import React from "react";
import styled from "styled-components";

import refundAndExchangeImg1 from "../../assets/media/static/refundAndExchange/refundAndExchangeImg1.svg";
import refundAndExchangeImg2 from "../../assets/media/static/refundAndExchange/refundAndExchangeImg2.svg";
import refundAndExchangeImg3 from "../../assets/media/static/refundAndExchange/refundAndExchangeImg3.svg";
import refundAndExchangeImg4 from "../../assets/media/static/refundAndExchange/refundAndExchangeImg4.svg";
import refundAndExchangeImg5 from "../../assets/media/static/refundAndExchange/refundAndExchangeImg5.svg";
import refundAndExchangeImg6 from "../../assets/media/static/refundAndExchange/refundAndExchangeImg6.svg";
import refundAndExchangeMobileImg1 from "../../assets/media/static/refundAndExchange/refundAndExchangeMobileImg1.svg";
import refundAndExchangeMobileImg2 from "../../assets/media/static/refundAndExchange/refundAndExchangeMobileImg2.svg";
import refundAndExchangeMobileImg3 from "../../assets/media/static/refundAndExchange/refundAndExchangeMobileImg3.svg";
import refundAndExchangeMobileImg4 from "../../assets/media/static/refundAndExchange/refundAndExchangeMobileImg4.svg";
import refundAndExchangeMobileImg5 from "../../assets/media/static/refundAndExchange/refundAndExchangeMobileImg5.svg";
import refundAndExchangeMobileImg6 from "../../assets/media/static/refundAndExchange/refundAndExchangeMobileImg6.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    margin: 0 20px;
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
  margin-top: 30px;
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
    margin-top: 40px;
    margin-left: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    margin-top: 0;
    flex-direction: column;
  }
`;

const StyledText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  white-space: pre-line;
  max-width: 1150px;
  margin-top: 30px;
  font-family: Open sans;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    margin-left: 10px;
    margin-top: 15px;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 15px;
    max-width: 90%;
    margin-left: 20px;
  }
`;

const BlockText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  white-space: pre-line;
  max-width: 1150px;
  margin-top: 10px;
  margin-left: 10px;
  font-family: Open sans;

  @media screen and (min-width: 768px) and (max-width: 1439px) {
    margin-left: 10px;
    margin-top: 15px;
  }
  @media screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 20px;
    max-width: 90%;
    margin-left: 20px;
  }
`;

const RefundAndExchangeImg1 = styled.img.attrs({ src: refundAndExchangeImg1 })`
  margin-top: 20px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;

const RefundAndExchangeImg2 = styled.img.attrs({ src: refundAndExchangeImg2 })`
  margin-top: 20px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;

const RefundAndExchangeImg3 = styled.img.attrs({ src: refundAndExchangeImg3 })`
  margin-top: 20px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;
const RefundAndExchangeImg4 = styled.img.attrs({ src: refundAndExchangeImg4 })`
  margin-top: 20px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;
const RefundAndExchangeImg5 = styled.img.attrs({ src: refundAndExchangeImg5 })`
  margin-top: 20px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;
const RefundAndExchangeImg6 = styled.img.attrs({ src: refundAndExchangeImg6 })`
  margin-top: 20px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;

const RefundAndExchangeMobileImg1 = styled.img.attrs({
  src: refundAndExchangeMobileImg1,
})`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const RefundAndExchangeMobileImg2 = styled.img.attrs({
  src: refundAndExchangeMobileImg2,
})`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const RefundAndExchangeMobileImg3 = styled.img.attrs({
  src: refundAndExchangeMobileImg3,
})`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const RefundAndExchangeMobileImg4 = styled.img.attrs({
  src: refundAndExchangeMobileImg4,
})`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const RefundAndExchangeMobileImg5 = styled.img.attrs({
  src: refundAndExchangeMobileImg5,
})`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const RefundAndExchangeMobileImg6 = styled.img.attrs({
  src: refundAndExchangeMobileImg6,
})`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const RefundAndExchange = () => {

  return (
    <Container>
      <Column>
        <Title>Условия обмена и возврата по заказу</Title>
        <StyledText>
          Условия любых изменений в оформленных авиабилетах регламентируются
          правилами применения тарифа выбранной авиакомпании, договором-офертой
          на оказание услуг Агентства, Воздушным кодексом РФ, а также другими
          законодательными актами РФ, и могут предполагать наложение штрафных
          санкций на покупателя.
        </StyledText>
        <StyledText>
          С правилами применения тарифов пользователь имеет возможность
          ознакомиться в ходе прохождения диалога бронирования.
        </StyledText>
        <StyledText>
          Агентство имеет право взимать с покупателя дополнительные сервисные
          сборы - за услуги Агентства по бронированию и оформлению электронных
          билетов, а также за обмен или возврат ранее оформленного билета.
          Сервисный сбор Агентства включается в стоимость заказа и в случае
          возврата или обмена билетов возмещению не подлежит.
        </StyledText>
        <StyledText>
          Если возникает необходимость в возврате денежных средств за оплаченную
          услугу, Агентство инициализирует процесс возврата после согласования с
          покупателем. После инициализации процесс возврата денежных средств
          может занимать до 30 дней, согласно правилам работы платежного шлюза.
        </StyledText>
        <Title>Как вернуть авиабилет или услугу?</Title>
        <StyledText>
          Возврат денежных средств за неиспользованные авиабилеты, оформленные
          на сайте avia-new.fstravel.com, можно провести только в нашем
          агентстве.
        </StyledText>
        <StyledText>
          Обратите внимание, если по билету пройдена регистрация на рейс, то для
          произведения возврата вам необходимо снять регистрацию с рейса путем
          личного обращения в Авиакомпанию (по телефону или через представителей
          в аэропорту).
        </StyledText>
        <FlexRow>
          <Column>
            <BlockText style={{ fontWeight: "bold" }}>Шаг 1. </BlockText>
            <BlockText style={{ maxWidth: 350 }}>
              Для создания обращения нажмите кнопку{" "}
              <span style={{ fontWeight: "bold" }}>“Служба поддержки”</span> в
              деталях заказа.
            </BlockText>
            <RefundAndExchangeImg1 />
            <RefundAndExchangeMobileImg1 />
          </Column>
          <Column>
            <BlockText style={{ fontWeight: "bold" }}>Шаг 2. </BlockText>
            <BlockText style={{ maxWidth: 350 }}>
              Выберите тему обращения{" "}
              <span style={{ fontWeight: "bold" }}>“Возврат”</span> и
              внимательно заполните форму.
            </BlockText>
            <RefundAndExchangeImg2 />
            <RefundAndExchangeMobileImg2 />
          </Column>
          <Column>
            <BlockText style={{ fontWeight: "bold" }}>Шаг 3. </BlockText>
            <BlockText style={{ maxWidth: 350 }}>
              Отслеживайте статус и уведомления по обращению во вкладке{" "}
              <span style={{ fontWeight: "bold" }}>“Обращения”</span>.
            </BlockText>
            <RefundAndExchangeImg3 />
            <RefundAndExchangeMobileImg3 />
          </Column>
        </FlexRow>
        <StyledText style={{ marginTop: 40 }}>
          После создания обращения на Вашу почту поступит автоматическое
          сообщение о получении запроса. На автоматическое сообщение не нужно
          отвечать. Пожалуйста, не создавайте повторные обращения с тем же
          запросом - это замедлит процесс обработки. Наш специалист в ближайшее
          время свяжется с вами в чате по обращению и поможет решить ваш вопрос.
        </StyledText>
        <StyledText>
          Дождитесь смены статуса Обращения на{" "}
          <span style={{ fontWeight: "bold" }}>«Расчет выполнен»</span> который
          означает, что запрос обработан нашими специалистами и ознакомиться с
          суммой к возврату (мы стараемся делать расчёт в течение 24-х часов, но
          иногда операция требует значительно больше времени из-за необходимости
          обращаться в авиакомпанию). Подтвердите завершение процедуры возврата
          авиабилета и получить денежные средства тем же способом, каким
          авиабилет был оплачен.
        </StyledText>
        <StyledText>
          <span style={{ fontWeight: "bold" }}>
            Сервисный сбор за процедуру возврата составляет 100 руб
          </span>
          . Обращаем Ваше внимание, что операция возврата билета необратима.
          Подтверждение Вами заявки на возврат означает, что Вы ознакомлены с
          правилами возврата ваших авиабилетов.
        </StyledText>
        <StyledText>
          <span style={{ fontWeight: "bold" }}>Внимание!</span> Служба поддержки
          по вопросам проведения обмена и возврата работает ежедневно с 09:00 до
          21:00 по Московскому времени. Если у вас срочное обращение,
          рекомендуем обратиться к авиаперевозчику.
        </StyledText>
        <Title>Как обменять авиабилет или услугу?</Title>
        <StyledText>
          Возможности обмена и внесения изменений устанавливаются правилами
          применения тарифа, по которому вы приобрели билет на самолет.
        </StyledText>
        <FlexRow>
          <Column>
            <BlockText style={{ fontWeight: "bold" }}>Шаг 1. </BlockText>
            <BlockText style={{ maxWidth: 350 }}>
              Для создания обращения нажмите кнопку{" "}
              <span style={{ fontWeight: "bold" }}>“Служба поддержки”</span> в
              деталях заказа.
            </BlockText>
            <RefundAndExchangeImg4 />
            <RefundAndExchangeMobileImg4 />
          </Column>
          <Column>
            <BlockText style={{ fontWeight: "bold" }}>Шаг 2. </BlockText>
            <BlockText style={{ maxWidth: 350 }}>
              Выберите тему обращения{" "}
              <span style={{ fontWeight: "bold" }}>“Обмен”</span> и внимательно
              заполните форму.
            </BlockText>
            <RefundAndExchangeImg5 />
            <RefundAndExchangeMobileImg5 />
          </Column>
          <Column>
            <BlockText style={{ fontWeight: "bold" }}>Шаг 3. </BlockText>
            <BlockText style={{ maxWidth: 350 }}>
              Отслеживайте статус и уведомления по обращению во вкладке{" "}
              <span style={{ fontWeight: "bold" }}>“Обращения”</span>.
            </BlockText>
            <RefundAndExchangeImg6 />
            <RefundAndExchangeMobileImg6 />
          </Column>
        </FlexRow>
        <StyledText style={{ marginTop: 40 }}>
          Дождитесь получения рачета и подтвердите его. После успешной оплаты
          наши специалисты завершат процедуру обмена при условии наличия
          выбранного тарифа, по которому произведен «Расчет», и выпишут новый
          билет.
        </StyledText>
        <StyledText>
          <span style={{ fontWeight: "bold" }}>
            Сервисный сбор за процедуру обмена составляет 100 руб
          </span>
          . Обращаем Ваше внимание, что операция обмена билета необратима.
          Подтверждение Вами заявки на возврат означает, что Вы ознакомлены с
          правилами возврата ваших авиабилетов.
        </StyledText>
        <StyledText>
          Как правило, обмен авиабилета совершается в течение 24-х часов, но
          иногда операция может занимать значительно больше времени в связи с
          соблюдением требований авиакомпаний.
        </StyledText>
        <StyledText>
          <span style={{ fontWeight: "bold" }}>Внимание!</span> Служба поддержки
          по вопросам проведения обмена и возврата работает ежедневно с 09:00 до
          21:00 по Московскому времени. Если у вас срочное обращение,
          рекомендуем обратиться к авиаперевозчику.
        </StyledText>
      </Column>
    </Container>
  );
};

export default RefundAndExchange;
