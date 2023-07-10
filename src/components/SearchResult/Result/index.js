import React from 'react';
import './Result.scss';
import {useSelector} from 'react-redux';
import FlightsList from './FlightsList'
import Error from "../Error"

export default function SearchResult() {
  const {loadingStatus,error,data} = useSelector(x => x.flights.result);
  return (
    <div>
      {
      data?.data?.length !== 0 &&
       loadingStatus === 'success' && 
      <FlightsList items={data.flightsList.items} />
      }
      {data?.data?.length === 0 && <Error />}
    </div>
  );
}