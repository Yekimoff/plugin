import {
  checkAvailablityNormalizer,
  normalizeGetInsuranceCalculationResponse,
} from './utils';

export const BOOKING_NOT_AVAILABLE = 431;

/**
 * action: @booking/selectFlightRequest
 * @param id id search result
 * @param index index of selected group
 * @param indexesOfFlightsInGroups index of selected flights in selected group
 */
export function checkAvailablity(
  id,
  index,
  indexesOfFlightsInGroups
) {
  return fetch(
    `https://avia-new.fstravel.com/api/wl-plugin/external/airCheckAvailability/v3/${id}/${index}/${indexesOfFlightsInGroups.join(',')}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((response) => response.json())
    .then(checkAvailablityNormalizer);
}

/**
 * action: @booking/create
 * @param data
 */
export function bookTicket(data) {
  return fetch('somewhere');
  // return Api.request(
  //   {
  //     url: createAviaFetchUrl(END_POINTS.book),
  //     method: 'POST',
  //     body: JSON.stringify({
  //       ...data,
  //       PromoCode: 'z',
  //       PaymentType: 'CASH',
  //     }),
  //     headers: { 'Content-Type': CONTENT_TYPE.JSON },
  //   },
  //   STRATEGY_TYPES.AUTH
  // )
  //   .then(Api.statuses)
  //   .then(Api.json);
}

/**
 * action: @booking/create
 * @param data
 */
export function getInsurances(
  calculationId
) {
  return fetch(`https://avia-new.fstravel.com/api/wl-plugin/external/Insurance/get-calculation?calculationId=${calculationId}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(x => x.json())
    .then(normalizeGetInsuranceCalculationResponse);
  
}

export const getAddictionalServices = (
  orderId
) => fetch(`https://avia-new.fstravel.com/api/wl-plugin/external/AdditionalService/additional-services?orderId=${orderId}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  ).then(x => x.json());

  export const getBookingUrl = (
    id, index
  ) => fetch(`https://avia-new.fstravel.com/api/wl-plugin/external/booking/${id}/${index}/0`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    ).then(x => x.json());



export function setInsuranceAgreement(
  payload
) {
  return fetch('/sdfkg');
  // return Api.request({
  //   url: `${process.env.REACT_APP_ORDER_SERVICE_HOST}/insurance/set-insurance-agreement`,

  //   method: 'POST',
  //   body: JSON.stringify(payload),
  //   headers: { 'Content-Type': Api.CONTENT_TYPE.JSON },
  // })
  //   .then(Api.statuses)
  //   .then(Api.json);
}
