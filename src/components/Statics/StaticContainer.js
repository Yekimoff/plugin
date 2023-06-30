import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 261px;
  background: white;
  position: absolute;
  display:flex;
  flex-direction:column;
  padding:10px 0;
  z-index:2000000;
  @media screen and (max-width: 450px) {
    width:100%;
  }
`;

const Item = styled.div`
  height: 38px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #3c3c3c;
  padding:0 14px;
display:flex;
align-items:center;
cursor:pointer;
  &:hover {
    background: #edf1fe;
  }

  @media screen and (max-width: 450px) {
    height:56px;
    font-size: 18px;
  line-height: 20px;
  }
`;

const StaticContainer = ({ setChosenStaticPage, setIsOpen}) => {
  const staticPages = [
    { name: "Как забронировать билет", value: "booking" },
    { name: "Дополнительные услуги", value: "services" },
    { name: "Пользовательское соглашение", value: "userAgreemnet" },
    { name: "Способы оплаты бронирования", value: "payment" },
    { name: "Страховые продукты", value: "insurance" },
    { name: "Обмен и возврат билетов", value: "refundExchange" },
  ];
  return (
    <Wrapper onMouseLeave={() => setIsOpen(false)}>
      {staticPages.map((page) => (
        <Item onClick={() => {setChosenStaticPage(page.value); setIsOpen(false)}}>{page.name}</Item>
      ))}
    </Wrapper>
  );
};

export default StaticContainer;
