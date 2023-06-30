import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { Text } from '../../../shared';
import * as Helper from '../../../../utils';
import CheckIconSrc from '../../../../assets/media/booking/check.svg';

const Icon = styled.img.attrs({ alt: 'icon' })`
  width: 35px;
  height: 35px;

  @media (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  ${Icon} {
    margin-right: 8px;
  }
`;

const HeaderText = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #3c3c3c;

  & > strong {
    font-weight: 600;
    color: #4872f2;
  }

  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const BaseText = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #3c3c3c;

  & > a {
    color: #4872f2;
    text-decoration: none;
  }

  & > strong {
    font-weight: 600;
  }
`;

const Paragraph = styled(BaseText)`
  display: block;
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 10px;
  }
  & > :last-child {
    margin-bottom: 0;
  }
  margin-bottom: 19px;

  @media (max-width: 767px) {
    margin-bottom: 15px;
  }
`;

const Feature = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 5px;
  }
`;

const CheckIcon = styled.img.attrs({ src: CheckIconSrc, height: 9, width: 13 })`
  margin-top: 5px;
  margin-right: 5px;
`;

const Agreement = styled(Paragraph)`
  // white-space: nowrap;

  // @media (max-width: 767px) {
  //   white-space: inherit;
  // }
`;

const Cross = styled.a`
  width: 15px;
  height: 15px;
  cursor: pointer;
  position: relative;
  outline: none;
  &:hover {
    &:before,
    &:after {
      background-color: ${({ theme: { colors } }) => colors.darkGray};
    }
  }
  &:before,
  &:after {
    position: absolute;
    content: ' ';
    height: 17px;
    width: 2px;
    right: 3.5px;
    bottom: 0.5px;
    background-color: ${({ theme: { colors } }) => colors.main};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledPopup = styled(Popup)`
  &-content {
    position: relative;
    border: 1px solid #dcdcdc;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 30px;
    border-radius: 8px;
    box-sizing: border-box;
    width: 518px;

    ${Header} {
      margin-bottom: 24px;
    }

    ${Paragraph} {
      margin: 20px 0;
    }

    ${FeaturesContainer} {
      margin-top: 20px;
      margin-bottom: 30px;
    }

    ${Agreement} {
      margin-bottom: 15px;
    }

    ${Cross} {
      position: absolute;
      top: 21px;
      right: 21px;
    }

    @media (max-width: 767px) {
      width: 100%;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);

      overflow: scroll;
      border-radius: 0;
      border: none;
      padding: 44px 20px;

      ${Header} {
        margin-bottom: 15px;
      }

      .first {
        margin-top: 15px;
      }

      .second {
        margin-bottom: 10px;
      }

      ${FeaturesContainer} {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
  }

  &-overlay {
    z-index: 1001 !important;
  }
`;

export default function ({ open, onClose, data }) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleClickCross = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <StyledPopup open={open} onClose={onClose}>
      <Cross onClick={handleClickCross} />
      {!!data && (
        <>
          <Header>
            <Icon src={data.iconSrc} />
            <HeaderText>
              {data.product.name}{' '}
              <strong>{Helper.formatPrice(data.totalRate.value)}</strong>
            </HeaderText>
          </Header>
          <Paragraph className="first">{data.product.description}</Paragraph>
          <Paragraph className="second">Возместите свои расходы:</Paragraph>
          {data.risks.length > 0 && (
            <FeaturesContainer>
              {data.risks.map((item, key) => (
                <Feature key={key}>
                  <CheckIcon />
                  <BaseText>
                    <strong>{`${data.wordBeforePrice} ${Helper.formatPrice(
                      item.coverage.value
                    )} - `}</strong>{' '}
                    {item.description}
                  </BaseText>
                </Feature>
              ))}
            </FeaturesContainer>
          )}
          <Agreement>
            Выбирая страховку вы соглашаетесь с ее{' '}
            <a href={data.specificationUri} target="_blank" rel="noreferrer">
              правилами страхования
            </a>
            {data.offertaUri && (
              <>
                {' '}
                и{' '}
                <a href={data.offertaUri} target="_blank" rel="noreferrer">
                  офертой.
                </a>
              </>
            )}
          </Agreement>
          <Bottom>
            {!!data.company.phone && (
              <BaseText>
                Телефон страховой компании: <br />
                <strong>{data.company.phone}</strong>
              </BaseText>
            )}
            <img alt={data.company.name} src={data.company.logo} />
          </Bottom>
        </>
      )}
    </StyledPopup>
  );
}
