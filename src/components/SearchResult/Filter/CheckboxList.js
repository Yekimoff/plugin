import React from 'react';
import './CheckboxList.scss';

export default function CheckboxList(props) {
  return <div className={`fs-filter-checkbox-list ${props.className || ''}`}>{props.children}</div>
}