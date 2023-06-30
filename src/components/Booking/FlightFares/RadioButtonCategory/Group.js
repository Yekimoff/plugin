import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding-bottom: 30px;
  margin-bottom: -30px;

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0 14px;
    padding-bottom: 0;
    margin-bottom: 0;
    overflow-x: hidden;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`;



const EmptyContainer = styled.div`
  @media (max-width: 767px) {
    flex-grow: 1;
    display: none;
  }
`;

const StartItem = styled.div`
  width: 24px;
  @media (max-width: 767px) {
    width: 14px;
  }
`;

function Group(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = useCallback((data, index) => {
    setSelectedIndex(index);
    props.onChange(data);
  }, []);


 

  return (
    <Wrapper>
      <Container >
        <EmptyContainer>
          <StartItem />
        </EmptyContainer>
        {props.items.map((itemProps, index) => (
          <Item
            type={props.type}
            key={index}
            {...itemProps}
            checked={index === selectedIndex}
            index={index}
            renderFeature={props.renderFeature}
            onClick={handleClick}
            renderLabel={props.renderLabel}
          />
        ))}
        <EmptyContainer>
          <div />
        </EmptyContainer>
      </Container>
    </Wrapper>
  );
}

export default Group;
