import React from "react";
import styled from "styled-components";

import { ReactComponent as Cancel } from "../../assets/media/static/insurances/insurance1.svg";
import { ReactComponent as Defend } from "../../assets/media/static/insurances/insurance2.svg";
import { ReactComponent as Covid } from "../../assets/media/static/insurances/insurance3.svg";
import { ReactComponent as CancelFlight } from "../../assets/media/static/insurances/insurance4.svg";
import { ReactComponent as Weather } from "../../assets/media/static/insurances/insurance5.svg";
import { ReactComponent as OnlineDoctor } from "../../assets/media/static/insurances/OnlineDoctor.svg";
import alphastrah from "../../assets/media/static/insurances/alphastrah.png";
import insurion from "../../assets/media/static/insurances/insurion.png";
import { ReactComponent as Ok } from "../../assets/media/static/insurances/insuranceOK.svg";

import InsuranceBanner from "./InsuranceBanner";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 28px;
`;

const GridContainer = styled.div`
  display: grid;
  margin-top: 70px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  margin-top: 70px;

  max-width: 1170px;
  grid-column-gap: 36px;
  grid-row-gap: 36px;

  @media screen and (min-width: 768px) and (max-width: 1439px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 26px;
    grid-row-gap: 30px;
    margin: auto;
    margin-top: 37px;

    /* justify-items: center; */
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-row-gap: 30px;
    margin: auto;
    margin-top: 36px;

    /* justify-items: center; */
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
  @media screen and (max-width: 767px) {
    padding-top: 10px;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 302px;
  height: 450px;
  padding: 32px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 5px 10px rgba(0, 0, 0, 0.05);
  border-radius: 28px;
  justify-content: space-between;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    height: 382px;
    padding: 20px;
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
    padding: 15px;
    height: 350px;
    margin: 0 auto;
  }
`;

const Heading = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  color: #3c3c3c;
  margin-left: 15px;
  font-family: Open sans;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    font-size: 18px;
    line-height: 24px;
  }
  @media screen and (max-width: 767px) {
    font-size: 16px;
    line-height: 20px;
    margin-left: 10px;
  }
`;

const SubHeading = styled.div`
  padding-top: 30px;
  @media screen and (max-width: 1439px) {
    padding-top: 15px;
  }
`;

const SubInfoHeading = styled.div`
  padding-top: 20px;
`;

const InfoBlockSubText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #2e2e32;
  font-family: Open sans;
  @media screen and (min-width: 768px) and (max-width: 1439px) {
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Link = styled.a`
  text-decoration: none;
`;

const CompanyLogo = styled.img`
  display: block;
  margin-top: 14px;
  height: 37px;
  width: fit-content;
`;

const OkStyled = styled(Ok)`
  min-width: 22px;
  min-height: 22px;
  margin-right: 10px;
`;

const CancelStyled = styled(Cancel)`
  @media screen and (max-width: 1439px) {
    width: 40px;
    height: 40px;
  }
`;

const DefendStyled = styled(Defend)`
  @media screen and (max-width: 1439px) {
    width: 40px;
    height: 40px;
  }
`;

const CovidStyled = styled(Covid)`
  @media screen and (max-width: 1439px) {
    width: 40px;
    height: 40px;
  }
`;

const CancelFlightStyled = styled(CancelFlight)`
  @media screen and (max-width: 1439px) {
    width: 40px;
    height: 40px;
  }
`;

const WeatherStyled = styled(Weather)`
  @media screen and (max-width: 1439px) {
    width: 40px;
    height: 40px;
  }
`;

const OnlineDoctorStyled = styled(OnlineDoctor)`
  @media screen and (max-width: 1439px) {
    width: 40px;
    height: 40px;
  }
`;

const InsuranceService = () => {
  return (
    <Wrapper>
      <InsuranceBanner />
      <GridContainer>
        <InfoBlock>
          <div>
            <Row>
              <CancelStyled />
              <Heading>Отмена поездки</Heading>
            </Row>
            <SubHeading>
              <InfoBlockSubText>
                Обезопасьте себя на случай отмены запланированной поездки.
              </InfoBlockSubText>
            </SubHeading>
            <SubInfoHeading>
              <InfoBlockSubText>Возместите свои расходы: </InfoBlockSubText>
            </SubInfoHeading>
            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>до 20 000 ₽</span> - в случае
                внезапной отмены поездки из-за отказа в визе, травмы,
                госпитализации и еще 13 причин
              </InfoBlockSubText>
            </InfoRow>
          </div>

          <div>
            <InfoBlockSubText>
              Узнать подробнее{" "}
              <Link
                href="http://www.alfastrah.ru/docs/Offer_nsp_247_se.pdf"
                style={{ color: "#4872F2" }}
              >
                об условиях
              </Link>{" "}
            </InfoBlockSubText>
            <CompanyLogo src={alphastrah} />
          </div>
        </InfoBlock>

        <InfoBlock>
          <div>
            <Row>
              <DefendStyled />
              <Heading>Защита на время полета</Heading>
            </Row>
            <SubHeading>
              <InfoBlockSubText>
                Расширенная программа защиты для спокойного путешествия.{" "}
              </InfoBlockSubText>
            </SubHeading>
            <SubInfoHeading>
              <InfoBlockSubText>Возместите свои расходы: </InfoBlockSubText>
            </SubInfoHeading>
            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>до 10 000 ₽</span> - при
                задержке рейса
              </InfoBlockSubText>
            </InfoRow>
            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>до 40 000 ₽</span> - при
                пропаже багажа
              </InfoBlockSubText>
            </InfoRow>
            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>до 10 000 ₽</span> - при
                задержке багажа
              </InfoBlockSubText>
            </InfoRow>
            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>до 500 000 ₽</span> - в
                несчастном случае
              </InfoBlockSubText>
            </InfoRow>
          </div>
          <div>
            <InfoBlockSubText>
              Узнать подробнее{" "}
              <Link
                href="http://www.alfastrah.ru/docs/Offer_bg_zv_ns_247.pdf"
                style={{ color: "#4872F2" }}
              >
                об условиях
              </Link>
            </InfoBlockSubText>
            <CompanyLogo src={alphastrah} />
          </div>
        </InfoBlock>

        <InfoBlock>
          <div>
            <Row>
              <OnlineDoctorStyled />
              <Heading>Online-врач в поездку </Heading>
            </Row>
            <SubHeading>
              <InfoBlockSubText>
                Online-врач окажет вам медицинскую помощь дистанционно в любой
                точке мира.
              </InfoBlockSubText>
            </SubHeading>
            <SubInfoHeading>
              <InfoBlockSubText>Возместите свои расходы: </InfoBlockSubText>
            </SubInfoHeading>

            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}> 3 консультации врача</span> -
                в случае заболевания или травмы в период поездки.
              </InfoBlockSubText>
            </InfoRow>
            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>до 1 000 000 ₽</span> -
                страхование жизни и здоровья пассажиров.
              </InfoBlockSubText>
            </InfoRow>
          </div>
          <div>
            <InfoBlockSubText>
              Узнать подробнее{" "}
              <Link
                href="https://www.alfastrah.ru/docs/telemed_ns_offer.pdf"
                style={{ color: "#4872F2" }}
              >
                об условиях{" "}
              </Link>
            </InfoBlockSubText>
            <CompanyLogo src={alphastrah} />
          </div>
        </InfoBlock>

        <InfoBlock>
          <div>
            <Row>
              <CovidStyled />
              <Heading>ANTICOVID </Heading>
            </Row>
            <SubHeading>
              <InfoBlockSubText>
                Нет ничего важнее Вашего здоровья. Полис обеспечит
                гарантированную выплату при заболевании в поездке.
              </InfoBlockSubText>
            </SubHeading>
            <SubInfoHeading>
              <InfoBlockSubText>Возместите свои расходы: </InfoBlockSubText>
            </SubInfoHeading>

            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}> 15 000 ₽</span> - в случае
                диагностики COVID-19
              </InfoBlockSubText>
            </InfoRow>
            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>30 000 ₽</span> - в случае
                госпитализации с COVID-19
              </InfoBlockSubText>
            </InfoRow>
          </div>
          <div>
            <InfoBlockSubText>
              Узнать подробнее{" "}
              <Link
                href="http://www.alfastrah.ru/docs/Offer_anticovid_2_avia_247.pdf"
                style={{ color: "#4872F2" }}
              >
                об условиях{" "}
              </Link>
            </InfoBlockSubText>
            <CompanyLogo src={alphastrah} />
          </div>
        </InfoBlock>

        <InfoBlock>
          <div>
            <Row>
              <CancelFlightStyled />
              <Heading>Задержка рейса </Heading>
            </Row>
            <SubHeading>
              <InfoBlockSubText>
                Получите моментальную выплату от 3000 ₽ на карту, в случае
                задержки рейса от 3ч.
              </InfoBlockSubText>
            </SubHeading>
            <SubInfoHeading>
              <InfoBlockSubText>Возместите свои расходы: </InfoBlockSubText>
            </SubInfoHeading>

            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>от 3 000 ₽ </span> -
                моментальная выплата в случае задержки или отмены рейса
              </InfoBlockSubText>
            </InfoRow>
          </div>
          <div>
            <InfoBlockSubText>
              Узнать подробнее{" "}
              <Link href="/docs/reno.pdf" style={{ color: "#4872F2" }}>
                об условиях{" "}
              </Link>
            </InfoBlockSubText>
            <CompanyLogo src={insurion} />
          </div>
        </InfoBlock>

        <InfoBlock>
          <div>
            <Row>
              <WeatherStyled />
              <Heading>Гарантия хорошей погоды </Heading>
            </Row>
            <SubHeading>
              <InfoBlockSubText>
                Получите моментальную выплату 5000 ₽ на карту, в случае плохой
                погоды во время отдыха.
              </InfoBlockSubText>
            </SubHeading>
            <SubInfoHeading>
              <InfoBlockSubText>Возместите свои расходы: </InfoBlockSubText>
            </SubInfoHeading>

            <InfoRow>
              <OkStyled />
              <InfoBlockSubText>
                <span style={{ fontWeight: 600 }}>5 000 ₽ </span> - моментальная
                выплата, если температура воздуха опустится ниже -6.2 С или
                осадки составят выше 0.9 мм два дня подряд
              </InfoBlockSubText>
            </InfoRow>
          </div>
          <div>
            <InfoBlockSubText>
              Узнать подробнее{" "}
              <Link href="/docs/reno.pdf" style={{ color: "#4872F2" }}>
                об условиях{" "}
              </Link>
            </InfoBlockSubText>
            <CompanyLogo src={insurion} />
          </div>
        </InfoBlock>
      </GridContainer>
    </Wrapper>
  );
};

export default InsuranceService;
