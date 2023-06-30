import React from 'react';
import {useSelector} from 'react-redux';
import './SearchResult.scss';
import Filter from './Filter';
import Result from './Result';
import Loader from '../shared/Loader';

export default function SearchResult() {
  const {loadingStatus} = useSelector(x => x.flights.result);

  if(loadingStatus === 'idle') return null;
  if(loadingStatus === 'loading') return <Loader/>;

  return (
    <div className='fs-widget__search'>
      <div className='fs-widget__search__filter'>
          <Filter/>
      </div>
      <div className='fs-widget__search__result'>
          <Result/>
      </div>
    </div>
  )
}