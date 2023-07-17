import React from 'react';
import './CityField.scss';
import SuggestionList from './SuggestionList';
import {debounce} from 'lodash';


const dataCollection = {};

const getCityListByStr = async (
  str,
  abortController,
) => {
  const account = window['fs-flight-search-widget-config'] ? window['fs-flight-search-widget-config'].account : null;
  let headers = {};
  if (account) {
    headers = {'X-Account': account, 'X-Correlation-ID': sessionStorage.getItem('X-Correlation-ID')}
  }
  console.log(account);
  if (dataCollection[str]) return dataCollection[str];
  const response = await fetch(
    `http://proxy.tte.test.tui.local/api/external/cities/search?value=${str}`,
    {
      signal: abortController ? abortController.signal : undefined,
      headers: headers,
    }
  );
  if (!response.ok) {
    throw new Error('connection error');
  }
  dataCollection[str] = (await response.json()).data;

  return dataCollection[str];
};

export default function Input(props) {
  const [suggestItems,setSuggestion] = React.useState([]);
  const abortControllerRef = React.useRef(new AbortController());
  const isActive = props.value.name !== '';

  const loadSuggestions = React.useCallback(
    debounce(
      (value, signal,) => {
        getCityListByStr(value, signal)
          .then((data) => {
            setSuggestion(data);
          })
          .catch(() => {})
      },
      200
    ),
    []
  );

  const handleChange = (e) => {
    props.onChange({name: e.target.value,code: ''})
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    if(e.target.value === '') {
      setSuggestion([]);
    } else {
      loadSuggestions(e.target.value, abortControllerRef.current);

    }
  };


  const handleSelect = (data) => {
    props.onChange(data);
    setSuggestion([]);
  }


  return (    
    <div className='fs-city-field'>
      <label className={`fs-city-field__label ${isActive ?  'fs-city-field__label--active' : ''}`}>{props.label}</label>
      <input onChange={handleChange} className='fs-city-field__input' value={props.value.name}/>
      {props.value.code && <span className='fs-city-field__code'>{props.value.code}</span>}
      <SuggestionList onSelect={handleSelect} items={suggestItems}/>
    </div>
  )
}