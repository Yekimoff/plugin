import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  box-sizing: border-box;

`;

const Container = styled.div`
  @media (max-width: 1170px) {
    padding: 0 20px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #3c3c3c;
  font-family: Open Sans;
`;

const List = styled.div`
  display: grid;
  grid-template-areas:
    "field-1 field-2 field-3"
    "field-4 field-5 field-6";
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  row-gap: 12px;

  @media screen and (max-width:550px) {
    grid-template-areas:
    "field-1 field-2"
    "field-4 field-5"
    "field-3 field-6";
    grid-template-columns: repeat(2, 1fr);

  }
`;

const StaticPage = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #737373;
  cursor:pointer;
  :hover {
    color: #3965ee;
    text-decoration: none;
    text-underline-offset: 2px;
  }
`;

const Block = styled.div`
  ${Title} {
    display: block;
    margin-bottom: 16px;
  }
`;

const Line = styled.div`
  height: 1px;
  width: 1170px;
  background: #dcdcdc;
  margin: 60px 0 20px 0;
`;

const Footer = ({setChosenStaticPage}) => {
  return (
    <Wrapper>
              <Line />

      <Container>
        <Block>
          <Title>Клиентам</Title>
          <List>
            <StaticPage onClick={() => setChosenStaticPage("booking")}>Как забронировать билет</StaticPage>
            <StaticPage onClick={() => setChosenStaticPage("services")}>Дополнительные услуги</StaticPage>

            <StaticPage onClick={() => setChosenStaticPage("userAgreemnet")}>Пользовательское соглашение</StaticPage>

            <StaticPage onClick={() => setChosenStaticPage("payment")}>Способы оплаты бронирования</StaticPage>
            <StaticPage onClick={() => setChosenStaticPage("insurance")}>Страховые продукты</StaticPage>

            <StaticPage onClick={() => setChosenStaticPage("refundExchange")}>Обмен и возврат билетов</StaticPage>
          </List>
        </Block>
      </Container>
    </Wrapper>
  );
};

export default Footer;
