import React from 'react';
import styled from 'styled-components';
import { Checkbox, Button } from '../../../shared';
import labelPath from '../../../../assets/media/addictional-services/recommend.svg';


const Wrapper = styled.div`
  margin-top: 25px;
  width: 219px;
  min-height: 180px;
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.main : '#dcdcdc')};
  box-sizing: border-box;
  padding: 16px;
  border-radius: 10px;
  font-family: Open Sans;
  margin-right: 12px;
  flex-shrink: 0;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (max-width: 767px) {
    margin-top: 20px;
    width: 100%;
    background: ${({ isActive }) => (isActive ? '#FBFCFF' : 'transparent')};
  }
`;
const Head = styled.div`
  margin-bottom: 19px;
  display: flex;
  align-items: baseline;
  min-height: 40px;
`;
const Title = styled.span`
  margin-left: 12px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #3c3c3c;
`;
const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  & > span {
    margin-bottom: 5px;
  }
  & > :last-child {
    margin-bottom: 0;
  }
`;
const Feature = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #3c3c3c;
  min-height: 22px;
  white-space: pre-line;

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const HeadV2 = styled.div`
  margin-bottom: 16px;

  @media (max-width: 767px) {
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    & > :first-child {
      margin-right: 10px;
    }
  }
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

const IconLabel = styled.img.attrs({ src: labelPath })`
  position: absolute;
  right: -4px;
  top: -12px;
`;

function Item({
  label,
  data,
  onClick,
  renderFeature,
  renderLabel,
  features = [],
  type = 'checkbox',
  checked,
  index,
}) {
  const handleClick = () => onClick(data, index);

  return (
    <Wrapper isActive={checked}>
      {index === 1 && <IconLabel />}
      {type === 'checkbox' && (
        <Head>
          <Checkbox
            type="roundWithArrow"
            onChange={handleClick}
            checked={checked}
          />
          <Title>{label}</Title>
        </Head>
      )}
      {type === 'button' && (
        <HeadV2>{renderLabel ? renderLabel(data) : label}</HeadV2>
      )}
      {features && (
        <FeatureWrapper>
          {features.map((feature, key) => (
            <Feature key={key}>
              {typeof renderFeature === 'function'
                ? renderFeature(feature)
                : feature}
            </Feature>
          ))}
        </FeatureWrapper>
      )}
      {type === 'button' && (
        <StyledButton
          htmlType="button"
          color={checked ? 'gray' : undefined}
          onClick={handleClick}
        >
          {checked ? 'Выбран' : 'Выбрать'}
        </StyledButton>
      )}
    </Wrapper>
  );
}

export default Item;
