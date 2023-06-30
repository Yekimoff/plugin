import React from 'react';
import './Result.scss';
import {useSelector} from 'react-redux';
import FlightsList from './FlightsList'


export default function SearchResult() {
  const {loadingStatus,error,data} = useSelector(x => x.flights.result);

  return (
    <div>
      {loadingStatus === 'success' && <FlightsList items={data.flightsList.items}/>}
    </div>
  );
}