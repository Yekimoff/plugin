import {format} from 'date-fns';
import {v4 as uuid} from 'uuid';
import {uniq, flattenDeep} from 'lodash';
import {cityTo, cityFrom} from 'lvovich';
import {getAirlineLogo} from '../../utils';

export default function fetchFlights(args) {
    const passengers = `${args.passengers.adults.count}-${args.passengers.children.count}-${args.passengers.infants.count}`;
    const fromTo = `${args.cityFrom.code}-${args.cityTo.code}`;
    const toFrom = `${args.cityTo.code}-${args.cityFrom.code}`;
    const firstDate = new Date(
        args.firstDate
    );


    const secondDate = args.secondDate ? new Date(args.secondDate) : null;
    const url = 'https://avia-new.fstravel.com/api/wl-plugin/external/flightSearch/'
    const account = window['fs-flight-search-widget-config'].account


    return secondDate ? (fetch(
            `${url}${fromTo}/${format(firstDate, 'yyyy-MM-dd')}/${toFrom}/${secondDate ? format(secondDate, 'yyyy-MM-dd') : "nextDate=false"}/${passengers}/${args.flightClass}/false/z`, {
                headers: {
                    'X-Account': args.tokenData !== "" ? args.tokenData : account,
                    'X-Correlation-ID': sessionStorage.getItem('X-Correlation-ID'),
                }
            }
        )
            .then(res => res.json())
            .then(normalizer)
            .then(createFilter)) :
        (fetch(
            `${url}${fromTo}/${format(firstDate, 'yyyy-MM-dd')}/${passengers}/${args.flightClass}/false/z`, {
                headers: {
                    'X-Account': args.tokenData !== "" ? args.tokenData : account,
                    'X-Correlation-ID': sessionStorage.getItem('X-Correlation-ID'),
                }
            }
        )
            .then(res => res.json())
            .then(normalizer)
            .then(createFilter))
}

function normalizer(
    response,
    solo = false
) {
    const group = [];
    const absentCodes = new Set();

    const airlines = {};
    response.references.Airlines.map(
        (airline) => (airlines[airline.code] = airline)
    );


    response.data.forEach((item) => {
        const feature = item.features.find((feature) => feature.type === 'Baggage');
        const baggage = feature
            ? {value: feature.value, content: feature.content}
            : null;
        if (item.groups.length === 1) {
            group.push({
                groupIndex: item.index,
                flights: item.groups[0].flights,
                prices: item.prices,
                flight_Type: item.flight_Type,
                complexPrices: item.complexPrices,
                isExchangeable: item.isExchangeable,
                isRefundable: item.isRefundable,
                features: item.features,
                baggage,
            });
        } else {
            item.groups[0].flights.forEach((itm) => {
                item.groups[1].flights.forEach((itm2) => {
                    group.push({
                        groupIndex: item.index,
                        flights: [itm, itm2],
                        prices: item.prices,
                        flight_Type: item.flight_Type,
                        complexPrices: item.complexPrices,
                        isExchangeable: item.isExchangeable,
                        isRefundable: item.isRefundable,
                        baggage,
                        features: item.features,
                    });
                });
            });
        }
    });
    const tickets = [];
    group.forEach((group) => {
        const airlinesInfo = uniq(
            group.flights.reduce(
                (acc, x) => [
                    ...acc,
                    ...x.segments.map((segment) => airlines[segment.airlineCode]),
                ],
                []
            )
        );


        if (solo) {
            group.flights.forEach((flight) => {
                const from = flight.segments[0].from;
                const to = flight.segments[flight.segments.length - 1].to;

                tickets.push({
                    complexPrices: group.complexPrices,
                    features: group.features,
                    airlinesInfo,
                    id: uuid(),
                    flight_Type: group.flight_Type,
                    groupIndex: group.groupIndex,
                    isExchangeable: group.isExchangeable,
                    isRefundable: group.isRefundable,
                    flights: [
                        {
                            index: flight.index,
                            stops: flight.stops,
                            duration: flight.duration,
                            from,
                            to,
                            segments: flight.segments.map((segment) => {
                                if (!airlines[segment.operatingAirlineCode]) {
                                    absentCodes.add(segment.operatingAirlineCode);
                                }
                                return {
                                    ...segment,
                                    airlineInfo: {
                                        ...airlines[segment.airlineCode],
                                        operatingAirlineCode: segment.operatingAirlineCode,
                                        operatingAirlineName:
                                            airlines[segment.operatingAirlineCode]?.name ||
                                            'нету в референсах',
                                    },
                                };
                            }),
                        },
                    ],
                    prices: group.prices,
                    baggage: group.baggage,
                    searchId: response.responseId || '',
                });
            });
        } else {
            const flights = [];

            group.flights.forEach((flight) => {
                const from = flight.segments[0].from;
                const to = flight.segments[flight.segments.length - 1].to;

                flights.push({
                    index: flight.index,
                    stops: flight.stops,
                    duration: flight.duration,
                    from,
                    to,
                    segments: flight.segments.map((segment) => {
                        return {
                            ...segment,
                            airlineInfo: {
                                ...airlines[segment.airlineCode],
                                operatingAirlineCode: segment.operatingAirlineCode,
                                operatingAirlineName:
                                airlines[segment.operatingAirlineCode]?.name,
                            },
                        };
                    }),
                });
            });

            tickets.push({
                complexPrices: group.complexPrices,
                features: group.features,
                flight_Type: group.flight_Type,
                airlinesInfo,
                groupIndex: group.groupIndex,
                id: uuid(),
                flights: flights,
                isExchangeable: group.isExchangeable,
                isRefundable: group.isRefundable,
                prices: group.prices,
                baggage: group.baggage,
                searchId: response.responseId || '',
            });
        }
    });

    if (absentCodes.size > 0) {
        // eslint-disable-next-line no-console
        console.log(
            '%c отсутствуют авикомпании в референсах: ' +
            Array.from(absentCodes).join(','),
            'color:yellow;padding: 1rem;background: linear-gradient( green, orangered);'
        );
    }
    return {
        ...response,
        flightsList: {
            items: tickets,
            notFilteredItems: tickets,
        },
    };
}

function createFilter(data) {
    let flightsDurations = [];

    const transfers = {
        list: new Set(),
        tickets: [],
    };

    const transferDurationList = [];
    const prices = [];
    const flightTypes = [];
    const airlines = {};
    const airlinesValues = {};
    //TODO
    const timeArr = [];

    data.references.Airlines.forEach((airline) => {
        airlines[airline.code] = airline;
        // airlinesValues[airline.code] = true;
    });

    const airports = [];
    const ticketAirlines = [];
    const baggageList = [];
    const baggageFilterList = new Set();

    data.flightsList.items.forEach((ticket, index) => {
        prices.push(ticket.prices[0]);
        flightTypes.push(ticket.flight_Type);
        let stopsCount = 0;
        let transferDuration = 0;
        let count = 0;
        ticketAirlines[index] = [];

        baggageList.push(ticket.baggage === null ? null : ticket.baggage.value > 0);
        if (ticket.baggage) {
            baggageFilterList.add(
                ticket.baggage.value > 0 ? 'C багажом' : 'Без багажа'
            );
        }

        ticket.flights.forEach((flight, key) => {
            const from = flight.segments[0].from;
            const to = flight.segments[flight.segments.length - 1].to;
            if (!timeArr[key]) {
                timeArr[key] = {
                    from: {
                        city: from.city,
                        label: 'Вылет из ' + cityFrom(from.city),
                        min: 0,
                        max: 0,
                        values: [],
                        tickets: [],
                    },
                    to: {
                        city: to.city,
                        label: 'Прибытие в ' + cityTo(to.city),
                        min: 0,
                        max: 0,
                        values: [],
                        tickets: [],
                    },
                };
            }

            if (!airports[count]) {
                airports[count] = {
                    label: 'Вылет из ' + cityFrom(from.city),
                    airports: {},
                    tickets: [],
                };
                airports[count + 1] = {
                    label: 'Прибытие в ' + cityTo(to.city),
                    airports: {},
                    tickets: [],
                };
            }

            timeArr[key].from.tickets.push(
                new Date(
                    flight.segments[0].fromDate + ' ' + flight.segments[0].fromTime
                ).getTime()
            );

            timeArr[key].to.tickets.push(
                new Date(
                    flight.segments[flight.segments.length - 1].toDate +
                    ' ' +
                    flight.segments[flight.segments.length - 1].toTime
                ).getTime()
            );

            airports[count].airports[from.code] = {
                name: from.airport,
                code: from.code,
                checked: false,
            };

            airports[count].tickets.push(from.code);

            airports[count + 1].airports[to.code] = {
                name: to.airport,
                code: to.code,
                checked: false,
            };

            airports[count + 1].tickets.push(to.code);
            count += 2;
            if (flight.stops.length > stopsCount) {
                stopsCount = flight.stops.length;
            }

            const flightTransferDuration = flight.stops.reduce((a, b) => {
                return a < b.duration ? b.duration : a;
            }, 0);

            if (flightTransferDuration > transferDuration) {
                transferDuration = flightTransferDuration;
            }

            if (!flightsDurations[key]) {
                flightsDurations[key] = {
                    from: flight.from,
                    to: flight.to,
                    max: 0,
                    min: 0,
                    tickets: [],
                };
            }

            // let duration = 0;
            // let fromDate: null | Moment = null;
            const airlines = new Set();

            flight.segments.forEach((segment) => {
                airlines.add(segment.airlineCode);
                airlines.add(segment.operatingAirlineCode);
                // const toDate = moment(`${segment.toDate} ${segment.toTime}`);

                // if (fromDate) {
                //   duration += toDate.diff(fromDate, 'minutes');
                // }
                // fromDate = moment(`${segment.fromDate} ${segment.fromTime}`);
                // duration += toDate.diff(fromDate, 'minutes');
            });

            flightsDurations[key].tickets[index] = flight.duration;
            ticketAirlines[index].push(Array.from(airlines));
            ticketAirlines[index].push(Array.from(airlines));
        });

        transferDurationList.push(transferDuration); // add logic change to newTransfers
        transfers.list.add(stopsCount);
        transfers.tickets.push(stopsCount);
    });

    flightsDurations = flightsDurations.map(({from, to, tickets}) => {
        return {
            from,
            to,
            min: Math.min(...tickets),
            max: Math.max(...tickets),
        };
    });

    Array.from(new Set(flattenDeep(ticketAirlines)))
        .map((x) => {
            return data.references.Airlines.find((y) => y.code === x);
        })
        .forEach((x) => {
            airlinesValues[x.code] = false;
        });

    const time = timeArr.map((el) => {
        const fromMax = Math.max(...el.from.tickets);
        const fromMin = Math.min(...el.from.tickets);
        const toMax = Math.max(...el.to.tickets);
        const toMin = Math.min(...el.to.tickets);
        return {
            ...el,
            from: {
                ...el.from,
                min: fromMin,
                max: fromMax,
            },
            to: {
                ...el.to,
                min: toMin,
                max: toMax,
            },
        };
    })

    return {
        ...data,
        filter: {
            prices: {
                min: Math.min(...prices),
                max: Math.max(...prices),
            },
            airports: airports.map((airport) => {
                return {
                    ...airport,
                    airports: Object.entries(airport.airports).map(([_, val]) => val),
                };
            }),
            airlines: Array.from(new Set(flattenDeep(ticketAirlines)))
                .map((x) => {
                    return data.references.Airlines.find((y) => y.code === x);
                })
                .sort(
                    (a, b) => a.name?.localeCompare(b.name)
                ).map(x => {
                    const {logoUrl, ...rest} = x;
                    return {...rest, icon: getAirlineLogo(x.code, 48, 48)};
                }),
            transferDuration: {
                min: Math.min(...transferDurationList),
                max: Math.max(...transferDurationList),
            },
            baggage: Array.from(baggageFilterList)
                .sort((a, b) => a.length - b.length)
                .map((el) => ({
                    value: el === 'C багажом' ? 1 : 0,
                    label: el,
                })),
            time,
            flightsDurations,
            isFiltered: false,
            values: {
                prices: [Math.min(...prices), Math.max(...prices)],
                transferDuration: [
                    Math.min(...transferDurationList),
                    Math.max(...transferDurationList),
                ],
                flightsDurations: flightsDurations.map(x => [x.min, x.max]),
                time: time.map(x => ({from: [x.from.min, x.from.max], to: [x.to.min, x.to.max]})),
                airlines: [],
                baggage: [],
                airports: [],
                flightTypes: [],
            }
        },
        transfers: {
            list: Array.from(transfers.list).map((val) => {
                return {val, checked: false};
            }),
            tickets: transfers.tickets,
        },
        flightTypes,
        airlines: Array.from(new Set(flattenDeep(ticketAirlines)))
            .map((x) => {
                return data.references.Airlines.find((y) => y.code === x);
            })
            .sort(
                (a, b) => a.name?.localeCompare(b.name)
            ).map(x => ({...x, icon: getAirlineLogo(x.code, 48, 48)})),
        airlinesTickets: ticketAirlines,
        airports: airports.map((airport) => {
            return {
                ...airport,
                airports: Object.entries(airport.airports).map(([_, val]) => val),
            };
        }),
        baggageFilter: baggageList,
        baggage: Array.from(baggageFilterList)
            .sort((a, b) => a.length - b.length)
            .map((el) => ({
                checked: false,
                label: el,
            })),
        values: {
            airports: airports.map((airport) => []),
            transfer: [],
            transferDuration: [
                Math.min(...transferDurationList),
                Math.max(...transferDurationList),
            ],
            airlines: airlinesValues,
            flightTypes: [],
        },
    };
}
