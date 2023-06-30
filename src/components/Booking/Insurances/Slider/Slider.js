import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import Modal from './InfoModal';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 20px;

  @media (max-width: 1032px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 767px) {
    display: block;

    & > div {
      margin-bottom: 20px;
    }

    & > :last-child {
      margin-bottom: 0;
    }
  }
`;

const Slider = ({
  items,
  onChange,
  disabled,
  className,
}) => {
  const [index, setIndex] = React.useState(null);
  const selectedItem = index !== null ? items[index] : null;

  return (
    <>
      <Container className={className}>
        {items.map((item, key) => (
          <Item
            disabled={disabled}
            key={key}
            {...item}
            index={key}
            onChange={onChange}
            onClick={(index) => {
              setIndex(index);
            }}
          />
        ))}
      </Container>
      <Modal
        open={index !== null}
        onClose={() => {
          setIndex(null);
        }}
        data={selectedItem}
      />
    </>
  );
};

export default Slider;
