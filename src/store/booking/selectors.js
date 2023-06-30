import { createSelector } from 'reselect';
import _ from 'lodash';
import { FaresState } from './types';

//SECTION Booking selectors

export const bookingInsuranceSelector = (state) =>
  state.booking.insurance;

export const addictionalServicesSelector = (state) =>
  state.booking.addictionalServices;

export const getSeatMapState = (state) =>
  state.booking.seatMap;

export const getBookingTicketState = (state) =>
  state.booking.ticket;
export const getBookingFaresState = (state) =>
  state.booking.fares;
export const getBookingPassengersState = (state) =>
  state.booking.passengers;
export const getBookingAncillaryServicesState = (state) =>
  state.booking.ancillaryServices;

export const getPriceDetail = (state) =>
  state.booking.priceDetail;

export const getFlights = createSelector(
  getBookingTicketState,
  (state) => state.flights
);

export const getSelectedFare = createSelector(
  getBookingFaresState,
  ({ selected }) => selected
);

export const maxTransitions = createSelector(getFlights, (flights) =>
  Math.max(...flights.map((flight) => flight.stops.length))
);

export const transitionsCount = createSelector(getFlights, (flights) =>
  flights.reduce((acc, x) => acc + x.stops.length, 0)
);

export const getFareCost = createSelector(getSelectedFare, (fare) => {
  const base = fare.prices.reduce((acc, x) => acc + x.total * x.count, 0);
  return {
    base,
    withExtraCharges: fare.prices.reduce(
      (acc, x) => acc + x.total * x.count,
      0
    ),
  };
});

export const getCheckedAncillaryServices = createSelector(
  getBookingAncillaryServicesState,
  (state) => {
    const data = _(state)
      .map((x) =>
        _(x.offers)
          .map((y) =>
            _(y)
              .map((z) => z.filter((z) => z.checked))
              .value()
          )
          .value()
      )
      .flatten()
      .flatten()
      .flatten()
      .value();
    return data;
  }
  // Object.entries(state).reduce(
  //   (acc, [key, x]) => ({
  //     ...acc,
  //     [key]: Object.entries(x).reduce(
  //       (acc, [key, x]) => ({
  //         ...acc,
  //         [key]: x.filter((value) => value.checked),
  //       }),
  //       {}
  //     ),
  //   }),
  //   {} as { [key in keyof typeof state]: typeof state[keyof typeof state] }
  // )
);

export const getTotalPrice = createSelector(
  [
    getCheckedAncillaryServices,
    getFareCost,
    bookingInsuranceSelector,
    addictionalServicesSelector,
    getSeatMapState,
  ],
  (ancillaryServices, fareCost, insurance, addictionalServices, seatMap) => {
    //** Ancillary services cost*/
    const ancillaryServicesCost = ancillaryServices.reduce(
      (acc, x) => acc + x.cost,
      0
    );

    const insuranceCost = _(insurance.list.offers)
      .filter((item) => item.checked)
      .reduce((acc, x) => acc + x.totalRate.value, 0);

    const addictionalServicesCost = addictionalServices
      .filter((x) => x.checked)
      .reduce((acc, x) => acc + x.amount, 0);

    const seatMapCost = _(seatMap.list)
      .map((x) =>
        x
          .filter((y) => y.seat !== null)
          .reduce((acc, y) => acc + (y.seat?.price.amount || 0), 0)
      )
      .reduce((acc, x) => acc + x, 0);

    return (
      fareCost.withExtraCharges +
      ancillaryServicesCost +
      insuranceCost +
      addictionalServicesCost +
      seatMapCost
    );
  }
);

export const getSubAgentCost = createSelector(
  [
    getCheckedAncillaryServices,
    addictionalServicesSelector,
    getSelectedFare,
    getSeatMapState,
  ],
  (ancillaryServices, addictionalServices, fare, seatMap) => {
    const fareSubagent = fare.prices.reduce(
      (acc, x) => acc + (x.subAgentExtraCharge || 0),
      0
    );

    //** Ancillary services cost*/
    const ancillaryServicesCost = ancillaryServices.reduce(
      //@ts-ignore
      (acc, x) => acc + x.subAgentMarkup,
      0
    );

    const addictionalServicesCost = addictionalServices
      .filter((x) => x.checked)
      //@ts-ignore
      .reduce((acc, x) => acc + x.subAgentExtraCharge, 0);

    return fareSubagent + ancillaryServicesCost + addictionalServicesCost;
  }
);

export const getTempData = createSelector(
  getBookingTicketState,
  (state) => state.tempData
);

export const getAncillaryServiceByType = (
  state,
  type
) => getBookingAncillaryServicesState(state)[type];

export const getPassengerMappedByUid = createSelector(
  [getBookingPassengersState],
  (passengers) =>
    passengers.reduce(
      (acc, x) => ({ ...acc, [x.uid]: x }),
      {}
    )
);

export const getUpt = createSelector(
  [getBookingTicketState, getSelectedFare],
  ({ flights }, fare) => {
    const routes = flights.map((value) => ({
      name: `${value.segments[0].from.code} - ${
        value.segments[value.segments.length - 1].to.code
      }`,
      description: fare.upt,
    }));
    return routes;
  }
);

export const getSeatsGroupedByPassengers = createSelector(
  [getSeatMapState, getSelectedFare],
  (state, fare) => {
    const arr = [];

    Object.entries(state.list).forEach(([key, x]) => {
      const segment = fare.seatMap.find((s) => s.flightNo === key);
      if (segment) {
        const segmentName = `${segment.from.city} - ${segment.to.city}`;
        const items = _(x)
          .map((y, key) => {
            return {
              key: y.uid,
              name: `Пассажир ${key + 1}, ${y.ageCategoryDescription}`,
              price: y.seat?.price.amount || 0,
              number: y.seat?.number,
            };
          })
          .filter((x) => !!x.number)
          .value();

        const price = _(items).reduce((acc, x) => acc + (x.price || 0), 0);
        if (price > 0) {
          arr.push({ name: segmentName, price, key, items });
        }
      }
    });

    return arr;
  }
);
