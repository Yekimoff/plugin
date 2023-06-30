import React from "react";
import styled from "styled-components";
import { ReactComponent as InsuranceIcon } from "../../assets/media/static/insurance-banner.svg";

const Container = styled.div`
  background: #edfaf9;
  border-radius: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 45px;
  height: 350px;
  overflow: hidden;

  & > svg {
    align-self: flex-end;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    position: relative;
    & > svg {
      width: 345.2px;
      height: 309.29px;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
    }

    & > :first-child {
      z-index: 2;
    }
  }

  @media (max-width: 767px) {
    height: auto;
    display: block;
    padding-left: 0;
    border-radius: 16px;

    & > :first-child {
      margin-bottom: 24px;
    }

    & > svg {
      width: 100%;
      height: auto;
    }
  }
`;

const BlockWithMaxWidth = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;

  @media (max-width: 1169px) {
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

const GrayText = styled.div`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.05em;
  color: #7e8389;
  z-index: 2;
  font-family: Open Sans;
`;

const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #2e2e32;
  font-family: Open Sans;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #2e2e32;
  z-index: 2;
  position: relative;
  font-family: Open Sans;

  @media (max-width: 1169px) {
    font-size: 20px;
    line-height: 26px;
  }
`;

const InfoContainer = styled.div`
  width: 474px;
  & > span {
    display: block;
  }

  ${GrayText} {
    margin-bottom: 8px;
  }

  ${Title} {
    margin-bottom: 24px;
  }

  ${Paragraph} {
    margin-bottom: 20px;
    @media (min-width: 768px) and (max-width: 1100px) {
      width: 350px;
    }
  }

  & > :last-child {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    width: auto;
    padding: 30px 21px 0 21px;
    ${GrayText} {
      margin-bottom: 5px;
    }
  }
`;

const InsuranceBanner = () => {
  return (
    <BlockWithMaxWidth>
      <Container>
        <InfoContainer>
          <GrayText>Ваша защита в любых условиях</GrayText>
          <Title>Страхование перелета</Title>
          <Paragraph>
            Отдых пройдет спокойнее с поддержкой надежной страховой компании.
            Полис обеспечит вам финансовую защиту в случае болезни, утраты
            багажа, отмены поездки и в других непредвиденных ситуациях.
          </Paragraph>
          <Paragraph>
            Обезопасьте свое путешествие от любых рисков с помощью надежных
            пакетов страхования.
          </Paragraph>
        </InfoContainer>
        <InsuranceIcon />
      </Container>
    </BlockWithMaxWidth>
  );
};

export default InsuranceBanner;
