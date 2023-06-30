import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-named-as-default
import Popup from 'reactjs-popup';
import { Scrollbars } from 'react-custom-scrollbars';
import { Text } from '@components/ui';
import { useMediaQuery } from 'react-responsive';
import { RETURN_MODAL_DESC, SMS_MODAL_DESC } from './constants';

const Thumb = styled.div`
  width: 2px;
  background-color: ${({ theme: { colors } }) => colors.main};
`;
const Track = styled.div`
  height: 100%;
  top: 0;
  right: 0;
  background-color: ${({ theme: { colors } }) => colors.lightGray};
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

const StyledPopup = styled(Popup)`
  &-overlay {
    @media (max-width: 767px) {
      z-index: 1000 !important;
    }
  }
  &-content {
    // width: 610px;
    border: 1px solid #dcdcdc;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    // padding: 40px;
    border-radius: 8px;
    padding: 0;

    @media (max-width: 767px) {
      width: 100%;
      border-radius: 0px;
      height: 100vh; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 100);
      // padding: 18px 20px;
      border-radius: 0;
      display: flex;
      flex-direction: column;
      & > :last-child {
        flex-grow: 1;
      }
    }
  }
`;

const Title = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  display: block;

  @media (max-width: 767px) {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    max-width: 280px;
    align-self: center;
  }
`;

const Description = styled.div`
  strong {
    font-weight: 600;
  }
  padding-right: 13px;
  margin: 0 27px 40px 40px;

  @media (max-width: 767px) {
    margin: 0 27px 40px 20px;
    padding-right: 0;
  }
`;

const PopupHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 40px;
  padding-bottom: 0;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: flex-end;
    text-align: center;
    padding: 48px;
    padding-bottom: 0;

    & > a {
      position: absolute;
      top: 18px;
      right: 26px;
    }
  }
`;

const Modal = ({
  children,
  type,
  setChosenModal,
  ...props
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  React.useEffect(() => {
    if (props.open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [props.open]);

  const chatProps = isMobile
    ? {
        autoHeightMax: 'calc(100vh - 129px)',
        autoHeightMin: 'calc(100vh - 129px)',
      }
    : { autoHeightMax: 456, autoHeightMin: 456, autoHeight: true };
  return (
    <StyledPopup {...props}>
      <PopupHead>
        <Title>Правила и условия предоставления услуги</Title>
        <Cross
          href="/sde"
          onClick={(e) => {
            e.preventDefault();

            typeof props.onClose === 'function' && props.onClose();
          }}
        />
      </PopupHead>
      <Scrollbars
        autoHeight
        hideTracksWhenNotNeeded
        {...chatProps}
        renderThumbVertical={({ style, ...props }) => (
          <Thumb {...props} style={{ ...style, width: 2, right: 1 }} />
        )}
        renderTrackVertical={({ style, ...props }) => (
          <Track {...props} style={{ ...style, width: 1 }} />
        )}
        renderTrackHorizontal={() => <div style={{ display: 'none' }} />}
      >
        <Description>
          {type === AddictionalServiceTypes.Return_Guarantee
            ? RETURN_MODAL_DESC
            : SMS_MODAL_DESC}
        </Description>
      </Scrollbars>
    </StyledPopup>
  );
};

export default Modal;
