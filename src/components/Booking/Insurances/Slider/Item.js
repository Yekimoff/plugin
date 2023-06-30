import React from 'react';
import styled from 'styled-components';
import { Text, Button } from '../../../shared';
import * as Helper from '../../../../utils';

const Wrapper = styled.div`
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.main : '#dcdcdc')};
  box-sizing: border-box;
  padding: 14px 7px 9px 14px;
  border-radius: 10px;
  font-family: Open Sans;
  flex-shrink: 0;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 769px) {
    padding: 14px;
  }
`;

const Description = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
  display: block;
  margin: 10px 0 15px 0;

  @media (max-width: 767px) {
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 18px;
  }
`;

const FooterDescription = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
  display: block;
  margin-top: auto;
  margin-bottom: ${({ withMargin }) => (withMargin ? '-3px' : 0)};
  white-space: nowrap;

  & > a {
    color: #4872f2;
    text-decoration: none;
  }

  @media (max-width: 767px) {
    text-align: left;
    font-size: 14px;
    line-height: 18px;
  }
`;

const DesktopFooterDescription = styled(FooterDescription)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileFooterDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: none;
  }

  ${FooterDescription} {
    display: inline;
    margin-bottom: 0;
  }
`;

const Overlay = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #80808014;
`;

const StyledButton = styled(Button)`
  max-width: 92px;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  padding: 7px 16px;
  display: block;
  margin-top: 16px;
`;

const DesktopBr = styled.br`
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileHead = styled.div`
  display: flex;
  align-items: flex-start;

  & > * {
    margin-right: 5px;
  }

  & > :last-child {
    margin-right: 0;
  }

  @media (max-width: 767px) {
    align-items: center;
  }
`;

const MobileName = styled(Text)`
  font-weight: 600;
`;

const MobilePrice = styled(MobileName)`
  color: #4872f2;
`;

const Title = styled.span`
  margin-left: 10px;
  & > span {
    margin-right: 5px;
  }

  @media (max-width: 767px) {
    margin-left: 5px;
  }
`;

const CovidTip = styled.div`
  position: absolute;
  top: -12px;
  right: 0;
  height: 24px;
  padding: 0 8px;
  border-radius: 8px;
  background: ${({ background }) => background};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CovidText = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
  margin-left: 5px;
`;

const CompanyLogo = styled.img.attrs({ width: 91 })`
  display: block;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const CompanyLogoMobile = styled.img`
  height: 31px;
`;

const Link = styled.a`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #3c3c3c;
  color: #4872f2;
  text-decoration: none;
`;

const Item = (props) => {
  const isProtection =
    props.product.name.includes('Защита на время полета') ||
    props.product.name.includes('Гарантия хорошей погоды') ||
    props.product.name.includes('Врач-online в поездку');
  const isInsuranceCancel = props.product.name.includes('Отмена');

  const handleClick = () => {
    props.onChange(props.product.id, props);
  };

  return (
    <Wrapper isActive={props.checked}>
      {props.disabled && <Overlay />}
      <MobileHead>
        <img alt="icon" src={props.iconSrc} width={30} height={30} />
        <Title>
          <MobileName>{props.product.name}</MobileName>
          {!isProtection && <DesktopBr />}
          <MobilePrice>{Helper.formatPrice(props.totalRate.value)}</MobilePrice>
        </Title>
      </MobileHead>
      <Description>{props.product.description}</Description>
      <CompanyLogo src={props.company.logo} alt={props.company.name} />
      <DesktopFooterDescription withMargin={isInsuranceCancel}>
        Подробнее{' '}
        <a
          href="/404"
          onClick={(e) => {
            e.preventDefault();
            props.onClick(props.index);
          }}
          target="_blank"
          rel="noreferrer"
        >
          об условиях
        </a>
      </DesktopFooterDescription>
      <MobileFooterDescription>
        <Link
          href="/404"
          onClick={(e) => {
            e.preventDefault();
            props.onClick(props.index);
          }}
          target="_blank"
          rel="noreferrer"
        >
          Условия страховки
        </Link>

        <CompanyLogoMobile src={props.company.logo} alt={props.company.name} />
      </MobileFooterDescription>

      <StyledButton
        htmlType="button"
        isLoading={props.loading}
        color={props.checked ? 'gray' : undefined}
        onClick={handleClick}
      >
        {props.checked ? 'Отменить' : 'Выбрать'}
      </StyledButton>
      {!!props.label && (
        <CovidTip background={props.label.color}>
          <img alt="icon" src={props.label.icon} />
          <CovidText>{props.label.text}</CovidText>
        </CovidTip>
      )}
    </Wrapper>
  );
};

export default Item;
