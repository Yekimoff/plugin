import React from "react";
import styled from "styled-components";
import bookingImg1 from "../../assets/media/static/bookingImg1.svg";
import bookingImg2 from "../../assets/media/static/bookingImg2.svg";
import bookingImg3 from "../../assets/media/static/bookingImg3.svg";
import bookingMobileImg1 from '../../assets/media/static/bookingMobileImg1.svg';
import bookingMobileImg2 from '../../assets/media/static/bookingMobileImg2.svg';
import bookingMobileImg3 from '../../assets/media/static/bookingMobileImg3.svg';


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
  margin: 0px 0px 10px 0px;
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
    margin-left: 20px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  color: #737373;
  text-decoration: none;
  color: #4460ef;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 14px;
    line-height: 18px;
    margin-left: 20px;
  }
`;

const ImageRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  max-width: 1200px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

const FreeSpace = styled.div`
  position: relative;
  height: 70px;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;


const StyledText = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  white-space: pre-line;
  max-width: 1150px;
  margin-top: 10px;
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

const TextBlock = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #3c3c3c;
  white-space: pre-line;
  max-width: 550px;
  margin-top: 10px;
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

const BookingImg1 = styled.img.attrs({ src: bookingImg1 })`
  margin-left: 70px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;

const BookingImg2 = styled.img.attrs({ src: bookingImg2 })`
  margin-right: 40px;
  position: relative;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;

const BookingImg3 = styled.img.attrs({ src: bookingImg3 })`
  margin-left: 90px;
  margin-top: 20px;
  cursor: pointer;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`;



const BookingMobileImg1 = styled.img.attrs({ src: bookingMobileImg1 })`
  margin-top: 20px;
  width: 100%;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const BookingMobileImg2 = styled.img.attrs({ src: bookingMobileImg2 })`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const BookingMobileImg3 = styled.img.attrs({ src: bookingMobileImg3 })`
  margin-top: 20px;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;


const HowToBook = () => {
  return (
    <Container>
      <Column>
        <Title>Как забронировать авиабилет?</Title>

        <StyledText>
          Процедура покупки авиабилета происходит следующим образом:
        </StyledText>
        <ImageRow>
          <Column>
            <StyledText style={{ fontWeight: "bold" }}>Шаг 1.</StyledText>
            <TextBlock>
              С помощью формы поиска билетов найдите лучший для вас вариант
              перелета.
            </TextBlock>
            <BookingMobileImg1 />
          </Column>
          <BookingImg1 />
        </ImageRow>
        <FreeSpace>{/* <Line1 /> */}</FreeSpace>
        <ImageRow>
          <BookingImg2 />
          <Column>
            <StyledText style={{ fontWeight: "bold" }}>Шаг 2.</StyledText>
            <TextBlock>
              Выберите тариф, заполните контактные данные и информацию о
              пассажирах.
            </TextBlock>

            <TextBlock style={{ marginTop: 20 }}>
              Вы можете самостоятельно заполнить данные пассажиров или
              воспользоваться автозаполнением с помощью кнопки{" "}
              <span style={{ fontWeight: "bold" }}>
                “Добавить из моих пассажиров”{" "}
              </span>
              .
            </TextBlock>
            <TextBlock style={{ marginTop: 20 }}>
              Благодаря этой функции вы сможете выбрать уже сохраненного ранее
              пассажира.
            </TextBlock>
            <BookingMobileImg2 />
          </Column>
        </ImageRow>
        <FreeSpace>{/* <Line2 /> */}</FreeSpace>
        <ImageRow>
          <Column>
            <StyledText style={{ fontWeight: "bold" }}>Шаг 3.</StyledText>
            <TextBlock>
              Мы предлагаем широкий выбор страховых продуктов и дополнительных
              услуг. Ознакомьтесь и выберите все необходимое.
            </TextBlock>
            <FlexRow style={{ marginTop: 17 }}>
              Узнать подробнее о доп. услугах
              {/* <Arrow /> */}
            </FlexRow>
            <FlexRow style={{ marginTop: 11 }}>
              Узнать подробнее о страховках
              {/* <Arrow /> */}
            </FlexRow>
            <TextBlock style={{marginTop:20}}>
              В завершении ознакомьтесь с условиями тарифа и оферты. Переход к
              оплате означает «согласие». После бронирования авиабилета вас
              автоматически направит в Личный кабинет на страницу с деталями
              вашего заказа. Проверьте ваш заказ, заполненные данные и
              переходите к оплате.
            </TextBlock>
            <BookingMobileImg3 />
          </Column>

          <BookingImg3 />
        </ImageRow>
      </Column>
    </Container>
  );
};

export default HowToBook;
