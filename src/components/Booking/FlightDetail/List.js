import React from 'react';
import Item from './Item';
import MobileNotActiveItem from './MobileNotActiveFlight';
import { useMediaQuery } from 'react-responsive';

const List = ({ items, active }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile && !active ? (
    <>
      {items.map((ticket, key) => (
        <MobileNotActiveItem
          active={active}
          flightIndex={key}
          length={items.length}
          key={key}
          separator={key !== items.length - 1}
          {...ticket}
        />
      ))}
    </>
  ) : (
    <>
      {items.map((ticket, key) => (
        <Item
          active={active}
          flightIndex={key}
          length={items.length}
          key={key}
          separator={key !== items.length - 1}
          {...ticket}
        />
      ))}
    </>
  );
};

export default List;
