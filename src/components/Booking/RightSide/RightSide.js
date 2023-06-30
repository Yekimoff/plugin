import React from 'react';
import './RightSide.scss';
import {formatPrice} from '../../../utils';
import FlightList from './FlightList';
import YourFlight from './YourFlight';
import Prices from './Prices'

const PRICE_LIST = [
  {
    quantity: 1,
    description: '1 взрослый',
    cost: 3034,
    type: 'pasenger-type',
    id: '1 взрослый'
  },
  {
    description: 'SMS-информирование',
    cost: 99,
    type: 'SMS_Service',
    quantity: 0,
    id: '4c6548f1-8f44-4cfc-be04-e27f8593de47'
  },
  {
    description: 'Гарантированный возврат билета',
    cost: 290,
    type: 'Return_Guarantee',
    quantity: 0,
    id: 'c257ce5c-c2cf-44c4-b301-1ef321a8e507'
  },
  {
    description: 'Справка о стоимости заказа',
    cost: 75,
    type: 'Payment_Receipt',
    quantity: 0,
    id: '91bf9f0a-6c29-4964-8930-820e54841835'
  },
  {
    description: 'Отмена поездки',
    cost: 100,
    type: 'insurance',
    quantity: 0,
    id: 'bb7263b2-5a1b-4f90-9352-6031a3b93d56'
  },
  {
    description: 'Врач-online в поездку',
    cost: 300,
    type: 'insurance',
    quantity: 0,
    id: '83a189e0-8358-4bdd-84f5-7b502d1a3171'
  }
];

const FLIGHTS = [
    {
      duration: 100,
      transitVisaInfo: null,
      transitVisaInfoText: null,
      index: 0,
      time: 'PT1H40M',
      minAvailSeats: 9,
      segments: [
        {
          techLandings: [],
          luggageWeightLimit: {
            value: 0,
            unit: 1,
            onePlaceWeight: null,
            totalPlaceWeight: null,
            handBaggagePlaceCount: null,
            handBaggageOnePlaceWeight: null,
            handBaggageSize: null,
            baggageSize: null
          },
          luggageWeightLimitInfant: null,
          luggageInfo: null,
          stopsCount: 0,
          transitVisaInfo: null,
          transitVisaInfoText: null,
          carrierPnr: null,
          childClassCode: null,
          childFareBasis: null,
          fareFamily: null,
          airlineFareFamily: 'WBSRT',
          fareFamilyFeature: null,
          index: 0,
          duration: 100,
          id: '63d0450b-4457-49ae-a757-f191cd567c42',
          seatMap: null,
          flightNo: '1023',
          airplane: 'Аэробус A320 (sharklets)',
          airline: 'S7 Airlines',
          operatingAirline: 'S7 Airlines',
          operatingAirlineCode: 'S7',
          airlineCode: 'S7',
          from: {
            code: 'DME',
            airport: 'Домодедово',
            city: 'Москва',
            country: 'Россия',
            terminal: ''
          },
          to: {
            code: 'LED',
            airport: 'Пулково',
            city: 'Санкт-Петербург',
            country: 'Россия',
            terminal: ''
          },
          fromDate: '2023-01-11',
          fromTime: '23:55:00',
          toDate: '2023-01-12',
          toTime: '01:35:00',
          time: 'PT1H40M',
          flightClass: 'ECONOMY',
          fareBasis: 'WBSRT',
          availSeats: 9,
          classCode: 'W'
        }
      ],
      stops: [],
      flight_Type: 'Regular'
    },
    {
      duration: 100,
      transitVisaInfo: null,
      transitVisaInfoText: null,
      index: 0,
      time: 'PT1H40M',
      minAvailSeats: 9,
      segments: [
        {
          techLandings: [],
          luggageWeightLimit: {
            value: 0,
            unit: 1,
            onePlaceWeight: null,
            totalPlaceWeight: null,
            handBaggagePlaceCount: null,
            handBaggageOnePlaceWeight: null,
            handBaggageSize: null,
            baggageSize: null
          },
          luggageWeightLimitInfant: null,
          luggageInfo: null,
          stopsCount: 0,
          transitVisaInfo: null,
          transitVisaInfoText: null,
          carrierPnr: null,
          childClassCode: null,
          childFareBasis: null,
          fareFamily: null,
          airlineFareFamily: 'WBSRT',
          fareFamilyFeature: null,
          index: 0,
          duration: 100,
          id: 'd1daafbe-5af6-41b7-be7d-bb9dcd181210',
          seatMap: null,
          flightNo: '1024',
          airplane: 'Аэробус A320 (sharklets)',
          airline: 'S7 Airlines',
          operatingAirline: 'S7 Airlines',
          operatingAirlineCode: 'S7',
          airlineCode: 'S7',
          from: {
            code: 'LED',
            airport: 'Пулково',
            city: 'Санкт-Петербург',
            country: 'Россия',
            terminal: ''
          },
          to: {
            code: 'DME',
            airport: 'Домодедово',
            city: 'Москва',
            country: 'Россия',
            terminal: ''
          },
          fromDate: '2023-01-19',
          fromTime: '05:20:00',
          toDate: '2023-01-19',
          toTime: '07:00:00',
          time: 'PT1H40M',
          flightClass: 'ECONOMY',
          fareBasis: 'WBSRT',
          availSeats: 9,
          classCode: 'W'
        }
      ],
      stops: [],
      flight_Type: 'Regular'
    }
];

export default function RightSide() {
  return (
    <div className='fs-booking-right-side'>
      <YourFlight/>
      <div className='fs-booking-right-side__divide'/>
      <Prices/>
    </div>
  );
}