import React from "react";
import styled from "styled-components";
import { ReactComponent as Refund } from "../../assets/media/static/addictional-services/return.svg";
import { ReactComponent as Cellphone } from "../../assets/media/static/addictional-services/cellphone.svg";
import { ReactComponent as Meal } from "../../assets/media/static/addictional-services/meal.svg";
import luggage from "../../assets/media/static/addictional-services/luggage.svg";
import { ReactComponent as SeatMap } from "../../assets/media/static/addictional-services/seat-map.svg";
import { ReactComponent as PrintIcon } from "../../assets/media/static/addictional-services/print-service.svg";
import insurance from "../../assets/media/static/addictional-services/insurance-3.svg";
import serviceMainImage from "../../assets/media/static/addictional-services/serviceMainImage.svg";
import serviceMainImageTablet from "../../assets/media/static/addictional-services/serviceMainImageTablet.svg"; //table need to fix
import serviceMainImageMobile from "../../assets/media/static/addictional-services/serviceMainImageMobile.svg";

import { ReactComponent as Icon1 } from "../../assets/media/static/addictional-services/services-small-icons/icon-1.svg";
import { ReactComponent as Icon2 } from "../../assets/media/static/addictional-services/services-small-icons/icon-2.svg";
import { ReactComponent as Icon3 } from "../../assets/media/static/addictional-services/services-small-icons/icon-3.svg";
import { ReactComponent as Icon4 } from "../../assets/media/static/addictional-services/services-small-icons/icon-4.svg";
import { ReactComponent as Icon5 } from "../../assets/media/static/addictional-services/services-small-icons/icon-5.svg";
import { ReactComponent as Icon6 } from "../../assets/media/static/addictional-services/services-small-icons/icon-6.svg";
import { ReactComponent as Icon7 } from "../../assets/media/static/addictional-services/services-small-icons/icon-7.svg";

// import { useMediaQuery } from 'react-responsive';

const Container = styled.div`
  width: 100%;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    margin-top: 28px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const BackgroundContainer = styled.div`
  background: url(${serviceMainImage});
  background-repeat: no-repeat;
  width: 1170px;
  height: 350px;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    width: 728px;
    height: 302px;
    margin-bottom: 80px;
    background: url(${serviceMainImageTablet});
  }
  @media screen and (min-width: 375px) and (max-width: 767px) {
    width: 335px;
    height: 434px;
    margin-bottom: 36px;
    background: url(${serviceMainImageMobile});
  }
`;

const GrayText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.05em;
  color: #7e8389;
  margin-bottom: 8px;
  padding-top: 45px;
  padding-left: 45px;
  font-family: Open Sans;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 488px;
  height: 175px;
  padding: 32px 9px 32px 32px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    width: 289px;
    height: 175px;
    padding: 20px 9px 20px 20px;
  }
  @media screen and (min-width: 375px) and (max-width: 767px) {
    width: 274px;
    padding: 20px 9px 20px 20px;
    height: 175px;
  }
`;

const Heading = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #3c3c3c;
  margin-left: 20px;
  font-family: Open Sans;

  @media screen and (min-width: 375px) and (max-width: 1439px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const InfoBlockText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #2e2e32;
  padding-top: 16px;
  font-family: Open Sans;

  @media screen and (min-width: 768px) and (max-width: 1439px) {
    font-size: 14px;
    line-height: 20px;
  }
  @media screen and (min-width: 375px) and (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const RulesText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #4872f2;
  padding-top: 15px;
  cursor: pointer;
  font-family: Open Sans;

  @media screen and (min-width: 375px) and (max-width: 1439px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const RightBlock = styled.div`
  background-color: ${(p) => p.color};
  width: 31px;
  height: 239px;
  border-top-right-radius: 28px;
  border-bottom-right-radius: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 375px) and (max-width: 1439px) {
    height: 215px;
  }
`;

const RightBlockText = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #3c3c3c;
  padding-top: 10px;
  writing-mode: vertical-lr;
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: unset;
  margin-top: 28px;
  margin-bottom: 60px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const ShowMore = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  text-decoration: none;
  color: #4872f2;
  position: relative;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Services = () => {
  return (
    <>
      <MobileContainer>
        <BackgroundContainer>
          <InfoBlockText
            style={{ width: 271, paddingTop: 103, paddingLeft: 20 }}
          >
            Мы заботимся о наших клиентах и предоставляем широкий выбор
            дополнительных услуг, для того, чтобы Вы в полной мере могли
            насладиться перелетом.
          </InfoBlockText>
          <InfoBlockText style={{ width: 271, paddingLeft: 20 }}>
            Сделайте Ваше путешествие наиболее комфортным и создайте для себя
            максимум удобств с помощью дополнительных услуг.
          </InfoBlockText>
        </BackgroundContainer>
        <Row>
          <InfoBlock id="refund">
            <Row>
              <Refund
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Heading style={{ marginLeft: 10 }}>Гарантия возврата</Heading>
            </Row>
            <InfoBlockText>
              В случае, если поездка не может состояться из-за внезапной болезни
              пассажира, мы вернем Вам деньги за билет без оплаты сервисного
              сбора.
            </InfoBlockText>

            <RulesText>Узнать о правилах услуги</RulesText>
          </InfoBlock>
          <RightBlock color="#DAE3FF">
            <Icon1 />
            <RightBlockText>ЛУЧШИЙ ВЫБОР</RightBlockText>
          </RightBlock>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <InfoBlock id="sms">
            <Row>
              <Cellphone
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Heading style={{ marginLeft: 10 }}>SMS-информирование</Heading>
            </Row>
            <InfoBlockText>
              Удобное получение всей информации о Вашем перелете: изменение
              расписания рейса, задержка вылета, сведения об оплате и другое.{" "}
            </InfoBlockText>
            <RulesText>Узнать о правилах услуги</RulesText>
          </InfoBlock>
          <RightBlock color="#FFFCE6">
            <Icon2 />

            <RightBlockText>ХИТ ПРОДАЖ</RightBlockText>
          </RightBlock>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <InfoBlock id="luggage">
            <Row>
              <div>
                <img src={luggage} style={{ width: 50, height: 50 }} />
              </div>
              <Heading style={{ marginLeft: 10 }}>Дополнительный багаж</Heading>
            </Row>
            <InfoBlockText>
              Оформите багаж заранее, в аэропорту эта услуга займет время и
              может стоить дороже, чем на сайте.
            </InfoBlockText>
          </InfoBlock>
          <RightBlock color="#F3FFDA">
            <Icon3 />

            <RightBlockText>РЕКОМЕНДУЕМ</RightBlockText>
          </RightBlock>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <InfoBlock style={{ height: 235 }} id="insurance">
            <Row>
              <div>
                <img src={insurance} style={{ width: 50, height: 50 }} />
              </div>

              <Heading style={{ marginLeft: 10 }}>Страхование</Heading>
            </Row>
            <InfoBlockText>
              Отдых пройдет спокойнее с поддержкой надежной страховой компании.
              Мы защитим Вас в случае болезни, утраты багажа, отмены поездки и в
              других непредвиденных ситуациях.
            </InfoBlockText>
          </InfoBlock>
          <RightBlock color="#DAE3FF" style={{ height: 275 }}>
            <Icon4 />

            <RightBlockText>ВАША ЗАЩИТА</RightBlockText>
          </RightBlock>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <InfoBlock id="seat">
            <Row>
              <SeatMap
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Heading style={{ marginLeft: 10 }}>Место в самолете</Heading>
            </Row>
            <InfoBlockText>
              Застрахуйте себя от случайной рассадки в самолете. Выберите место
              прямо сейчас и получайте удовольствие от комфортного полета.
            </InfoBlockText>
          </InfoBlock>
          <RightBlock color="#FFE1DA">
            <Icon5 />

            <RightBlockText>НЕ УПУСТИТЕ</RightBlockText>
          </RightBlock>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <InfoBlock id="meal">
            <Row>
              <Meal
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Heading style={{ marginLeft: 10 }}>Питание в самолете</Heading>
            </Row>
            <InfoBlockText>
              Выберите блюдо, подходящее Вашим вкусовым предпочтениям, и
              наслаждайтесь полетом.
            </InfoBlockText>
          </InfoBlock>
          <RightBlock color="#FFFCE6">
            <Icon6 />

            <RightBlockText>ДЛЯ ГУРМАНОВ</RightBlockText>
          </RightBlock>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <InfoBlock id="print">
            <Row>
              <PrintIcon
                style={{
                  width: 40,
                  height: 40,
                }}
              />
              <Heading style={{ marginLeft: 10 }}>
                Справка о стоимости заказа
              </Heading>
            </Row>
            <InfoBlockText>
              Справка может понадобиться бухгалтерии с вашего места работы для
              компенсации оплаты авиаперелета.
            </InfoBlockText>
          </InfoBlock>
          <RightBlock color="#F3FFDA">
            <Icon7 />

            <RightBlockText>ДЛЯ КОМАНДИРОВКИ</RightBlockText>
          </RightBlock>
        </Row>
      </MobileContainer>
      <Container>
        <BackgroundContainer>
      
            <GrayText>Не забудьте добавить</GrayText>
            <Heading style={{ marginLeft: 0, paddingLeft: 45 }}>
              Дополнительные услуги
            </Heading>
            <InfoBlockText
              style={{ width: 474, paddingTop: 8, paddingLeft: 45 }}
            >
              Мы заботимся о наших клиентах и предоставляем широкий выбор
              дополнительных услуг, для того, чтобы Вы в полной мере могли
              насладиться перелетом.
            </InfoBlockText>
            <InfoBlockText style={{ width: 474, paddingLeft: 45 }}>
              Сделайте Ваше путешествие наиболее комфортным и создайте для себя
              максимум удобств с помощью дополнительных услуг.
            </InfoBlockText>
          
        </BackgroundContainer>
        <Row>
          <Row>
            <InfoBlock id="refund">
              <Row>
                <Refund
                  style={{
                    width: 54,
                    height: 54,
                  }}
                />
                <Heading>Гарантия возврата билета</Heading>
              </Row>
              <InfoBlockText>
                В случае, если поездка не может состояться из-за внезапной
                болезни пассажира, мы вернем Вам деньги за билет без оплаты
                сервисного сбора.
              </InfoBlockText>

              <RulesText>
                Узнать о правилах и условиях предоставления услуги'
              </RulesText>
            </InfoBlock>
            <RightBlock color="#DAE3FF">
              <Icon1 />
              <RightBlockText>ЛУЧШИЙ ВЫБОР</RightBlockText>
            </RightBlock>
          </Row>
          <Row>
            <InfoBlock style={{ marginLeft: 50 }} id="sms">
              <Row>
                <Cellphone
                  style={{
                    width: 54,
                    height: 54,
                  }}
                />
                <Heading>SMS-информирование</Heading>
              </Row>
              <InfoBlockText>
                Удобное получение всей информации о Вашем перелете: изменение
                расписания рейса, задержка вылета, сведения об оплате и другое.{" "}
              </InfoBlockText>
              <RulesText>
                Узнать о правилах и условиях предоставления услуги
              </RulesText>
            </InfoBlock>
            <RightBlock color="#FFFCE6">
              <Icon2 />

              <RightBlockText>ХИТ ПРОДАЖ</RightBlockText>
            </RightBlock>
          </Row>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Row>
            <InfoBlock id="luggage">
              <Row>
                <div>
                  <img
                    src={luggage}
                    style={{
                      width: 54,
                      height: 54,
                    }}
                  />
                </div>

                <Heading>Дополнительный багаж</Heading>
              </Row>
              <InfoBlockText>
                Оформите багаж заранее, в аэропорту эта услуга займет время и
                может стоить дороже, чем на сайте.
              </InfoBlockText>
            </InfoBlock>
            <RightBlock color="#F3FFDA">
              <Icon3 />

              <RightBlockText>РЕКОМЕНДУЕМ</RightBlockText>
            </RightBlock>
          </Row>
          <Row>
            <InfoBlock style={{ marginLeft: 50, height: 175 }} id="insurance">
              <Row>
                <div>
                  <img
                    src={insurance}
                    style={{
                      width: 54,
                      height: 54,
                    }}
                  />
                </div>
                <Heading>Страхование</Heading>
              </Row>
              <InfoBlockText>
                Отдых пройдет спокойнее с поддержкой надежной страховой
                компании. Мы защитим Вас в случае болезни, утраты багажа, отмены
                поездки и в других непредвиденных ситуациях.
              </InfoBlockText>
              <RulesText>
                <ShowMore to="/questions/insurances">
                  Подробнее о видах страхования{" "}
                </ShowMore>
              </RulesText>
            </InfoBlock>
            <RightBlock color="#DAE3FF" style={{ height: 239 }}>
              <Icon4 />

              <RightBlockText>ВАША ЗАЩИТА</RightBlockText>
            </RightBlock>
          </Row>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Row>
            <InfoBlock id="seat">
              <Row>
                <SeatMap
                  style={{
                    width: 54,
                    height: 54,
                  }}
                />
                <Heading>Место в самолете</Heading>
              </Row>
              <InfoBlockText>
                Застрахуйте себя от случайной рассадки в самолете. Выберите
                место прямо сейчас и получайте удовольствие от комфортного
                полета.
              </InfoBlockText>
            </InfoBlock>
            <RightBlock color="#FFE1DA">
              <Icon5 />

              <RightBlockText>НЕ УПУСТИТЕ</RightBlockText>
            </RightBlock>
          </Row>
          <Row>
            <InfoBlock style={{ marginLeft: 50 }} id="meal">
              <Row>
                <Meal
                  style={{
                    width: 54,
                    height: 54,
                  }}
                />
                <Heading>Питание в самолете</Heading>
              </Row>
              <InfoBlockText>
                Выберите блюдо, подходящее Вашим вкусовым предпочтениям, и
                наслаждайтесь полетом.
              </InfoBlockText>
            </InfoBlock>
            <RightBlock color="#FFFCE6">
              <Icon6 />

              <RightBlockText>ДЛЯ ГУРМАНОВ</RightBlockText>
            </RightBlock>
          </Row>
        </Row>
        <Row style={{ marginTop: 50, marginBottom: 80 }}>
          <Row>
            <InfoBlock id="print">
              <Row>
                <PrintIcon
                  style={{
                    width: 54,
                    height: 54,
                  }}
                />
                <Heading>Справка о стоимости заказа</Heading>
              </Row>
              <InfoBlockText>
                Справка может понадобиться бухгалтерии с вашего места работы для
                компенсации оплаты авиаперелета.
              </InfoBlockText>
            </InfoBlock>
            <RightBlock color="#F3FFDA">
              <Icon7 />

              <RightBlockText>ДЛЯ КОМАНДИРОВКИ</RightBlockText>
            </RightBlock>
          </Row>
          <Row style={{ visibility: "hidden" }}>
            <InfoBlock style={{ marginLeft: 50 }} id="meal">
              <Row>
                <Meal
                  style={{
                    width: 54,
                    height: 54,
                  }}
                />
                <Heading>Питание в самолете</Heading>
              </Row>
              <InfoBlockText>
                Выберите блюдо, подходящее Вашим вкусовым предпочтениям, и
                наслаждайтесь полетом.
              </InfoBlockText>
            </InfoBlock>
            <RightBlock color="#FFFCE6">
              <RightBlockText>ДЛЯ ГУРМАНОВ</RightBlockText>
            </RightBlock>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default Services;
