import React from 'react';
import styled from 'styled-components';

export const Containter = styled.div`
  padding: 40px 52px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05), 0px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  min-width: 794px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.blackGray};
  align-self: baseline;
  @media (max-width: 767px) {
    padding: 14px;
    min-width: calc(100% - 28px);
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 25px;
`;

export const Title = styled.h3`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 16px;
  max-width: 491px;
  margin: 0 auto;
`;

export const SubTitle = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
`;

export const Ul = styled.ul`
  & > li {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 16px;
  }
`;



const Notification = ({
  children,
  title,
  subTitle,
}) => {
  return (
    <Containter>
      <Header>
        {title && <Title>{title}</Title>}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Header>
      <div>{children}</div>
    </Containter>
  );
};

Notification.Ul = Ul;

export default Notification;
