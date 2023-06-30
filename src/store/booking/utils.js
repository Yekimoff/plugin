import {
  PassengerAgeCategory,
  AncillaryServiceType,
} from './types';
import moment from 'moment';
import _, { memoize } from 'lodash';
import * as Helper from '../../utils';


import insuranceCancelSrc from '../../assets/media/insurances/insurance1.svg';
import insuranceProtectionSrc from '../../assets/media/insurances/insurance2.svg';
import insuranceCovidSrc from '../../assets/media/insurances/insurance3.svg';
import insuranceDelaySrc from '../../assets/media/insurances/insurance4.svg';
import insuranceWeatherSrc from '../../assets/media/insurances/insurance5.svg';
import insuranceDoctorSrc from '../../assets/media/insurances/insurance6.svg';
import alphastrahPath from '../../assets/media/insurances/alphastrah.png';
import insurionPath from '../../assets/media/insurances/insurion.png';
import CovidDeath from '../../assets/media/insurances/covidDeath.svg';
import Sun from '../../assets/media/insurances/sun.svg';
import Hearth from '../../assets/media/insurances/hearth.svg';

export const createBookingDto = (
  ticket,
  ancillaryServices,
  upsellIndex,
  payload,
  addictionalServices,
  seatMapState,
  user
)=> {
  const ancillaryKey = _(ancillaryServices)
    .map((x) =>
      _(x.offers)
        .map((y) =>
          _(y)
            .map((z) => z.filter((z) => z.checked).map((z) => z.key))
            .value()
        )
        .value()
    )
    .flattenDeep()
    .value();

  const seats = _(seatMapState.list)
    .map((x) =>
      x
        .filter((y) => y.seat != null)
        .map((y) => ({
          personUid: y.uid,
          segmentUid: y.segmentId,
          number: y.seat?.number,
          rfisc: y.seat?.rfisc,
        }))
    )
    .flatten()
    .value();
  // [

  const result = {
    CheckAvailabilityResponseId: ticket.id,
    UpsaleResponseIndex: upsellIndex,
    Passengers: payload.passengers.map(
      (passenger) => {
        const ageCategory = passenger.ageCategory.toUpperCase();

        return {
          Uid: passenger.uid,
          FirstName: passenger.name,
          LastName: passenger.surname,
          MiddleName: passenger.secondName,
          PatronymicName: passenger.secondName,
          FullName:
            passenger.surname +
            ' ' +
            passenger.name +
            ' ' +
            passenger.secondName,
          DateOfBirth: moment(passenger.birthDate).format(
            'YYYY-MM-DDT00:00:00'
          ),
          Sex: passenger.sex === 'm' ? 'MALE' : 'FEMALE',
          DocumentType: passenger.documentType,
          DocumentInfo: passenger.number,
          DocumentExpiryDate: passenger.dateOfIssue
            ? moment(passenger.dateOfIssue).format('YYYY-MM-DDT00:00:00')
            : moment().format('YYYY-MM-DDT00:00:00'),
          Citizenship: passenger.citizenship,
          AdditionalInfo:
            passenger.loyality.code !== ''
              ? `${passenger.loyality.code}:${passenger.loyality.value}`
              : null,
          AgeCategory: ageCategory,
        };
      }
    ),
    seats,
    InsuranceProductIds: payload.InsuranceProductIds,
    ContactEmail: payload.email,
    ContactPhone: payload.phone.replaceAll(/\+|\(|\)|-|\s/g, ''),
    contactName: payload.name,
    salesChannel: payload.salesChannel,
    insuranceAgreement: payload.isInsurancesChecked,
    changeAgreementToMailing: {
      isNeedToChange: true,
      value: payload.emailOfferta,
    },
    AdditionalServiceIds: _(addictionalServices)
      .filter((x) => x.checked)
      .map((x) => x.id)
      .value(),
    PromoCode: '',
    PushXGUID: '',
    AncillaryKey: ancillaryKey.length > 0 ? ancillaryKey.join(',') : null,
  };
  if (payload.marker !== null) {
    result.marker = payload.marker;
  }
  return result;
};

// Check availability response normalizer

const createSeatMap = (args) => {
  const arr = args.groups
    .map((x) =>
      x.flights
        .map((y) =>
          y.segments
            .map((z) => {
              if (z.seatMap === null) {
                return null;
              }
              return { ...z.seatMap, ...z, groupIndex: x.index };
            })
            .filter((z) => z !== null)
        )
        .flat()
    )
    .flat()
    .filter((x) => x !== null);
  return arr;
};

/**
 * Extract flights from unnecessary groups
 * Required for ticket reducer state
 * @param x group of flights, structure from avi search
 */
const createFlightsList = (
  x,
  flight_Type
) =>
  x.reduce(
    (acc,x) => [...acc, ...x.flights.map((x) => ({ ...x, flight_Type }))],
    []
  );

/**
 * Creating array of avia fares for fare reducer state
 * @param data CheckAvailabilityDTO
 */
const createFares = (data) => {
  const totalSum = memoize((arr) =>
    arr.reduce((acc, x) => acc + x.total, 0)
  );
  const getPriceDiff = (x0) => (x1) => x1 - x0;

  //error
  const diffWithBasePrice = getPriceDiff(
    totalSum(data.fares[0]?.tariff.prices || 0)
  );


  function createFromToString(segmentGroups) {
    return segmentGroups
      .map((value) => {
        if (value.flights.length === 1) {
          return [...value.flights, ...value.flights].map(extractCity);
        } else {
          return value.flights.map(extractCity);
        }
      })
      .map(_.flatten)
      .map((value, index, arr) => removeDuplicates(value, arr[index + 1]))
      .map((value) => value?.join(' - '))
      .join(' - ');
  }

  function extractCity(
    value,
    index,
    arr
  ) {
    if (index !== 0 && index !== arr.length - 1)
      return [
        value.segments[0].from.city,
        value.segments[value.segments.length - 1].to.city,
      ];
    return index === 0
      ? value.segments[0].from.city
      : value.segments[0].to.city;
  }

  function removeDuplicates(x1, x2) {
    if (!x2) {
      return x1;
    }
    if (x1[x1.length - 1] === x2[0]) {
      const x1Clone = [...x1];
      x1Clone.length = x1.length - 1;
      return x1Clone;
    }
  }

  const createFare =
    (upsellIndex) =>
      (
        x,
        upt,
        timeLimitDuration
      ) => {
        const fareFamily =
          x.fareFamilies && x.fareFamilies[0]
            ? x.fareFamilies[0]
            : {
              code: '',
              name: x.serviceClass,
              carrier: '',
              serviceClass: x.serviceClass,
              isExchangeable: null,
              isRefundable: null,
              routes: [],
              features: [],
            };

        const durationMinutes = Math.trunc(
          moment.duration(timeLimitDuration).asMinutes()
        );

        const result = {
          extraPrice: diffWithBasePrice(totalSum(x.prices)),
          prices: x.prices,
          ...fareFamily,
          fromTo: createFromToString(x.groups),
          upt: upt,
          timeLimitDuration: Helper.formatDuration(durationMinutes),
          upsellIndex,
          seatMap: createSeatMap(x),
          isExchangeable: x.isExchangeable,
          isRefundable: x.isRefundable,
          extraCharge: x.extraCharge,
          services: x.ancillaryServices,
        };
        return result;
      };

  return data.fares.map((fare) => {
    return createFare(fare.upsellIndex)(
      {
        ...fare.tariff,
        ancillaryServices: fare.ancillaryServices,
      },
      fare.upt,
      fare.timeLimitDuration
    );
  });
};

/** Passengers */

/**
 * Create passenger list, required for passenger reducer state
 * @param passengers
 */

/** Services */

const groupServicesByType = (services) => {
  return _(services)
    .groupBy('type')
    .map((value, key) => {
      return {
        type: key,
        offers: _(value)
          .map(({ type, offers, ...rest }) => {
            return offers.map((x) => ({ ...x, ...rest }));
          })
          .flatten()
          .value(),
      };
    })
    .value();
};

const createServiceFunc =
  (tariff) =>
    (service) => {
      const segments = _(tariff.groups)
        .reduce(
          (acc, x) => [
            ...acc,
            ...x.flights.reduce(
              (acc, x) => [...acc, ...x.segments],
              []
            ),
          ],
          []
        )
        .map((x) => ({
          id: x.id,
          route: `${x.from.city} - ${x.to.city}`,
          fulfilled: false,
        }));
      if (segments.length !== 1) {
        segments.push({
          id: segments.reduce((acc, x) => acc + x.id, ''),
          route: 'ВСЕ СЕГМЕНТЫ',
          fulfilled: false,
        });
      }

      const groupedSegments = segments.reduce(
        (acc, x) => ({ ...acc, [x.id]: x }),
        {}
      );

      const offers = _(service.offers)
        .groupBy((x) => x.flightSegmentsUid.join('-'))
        .mapValues((x) => {
          return _(x)
            .groupBy((x) => x.passengerId)
            .mapValues((x) => {
              return x.map((x) => ({
                ...x,
                checked: false,
                segmentName: groupedSegments[x.flightSegmentsUid[0]]?.route,
                cost: x.total,
                title:
                  service.type === AncillaryServiceType.Luggage
                    ? `Багаж до ${x.luggageInfo?.onePlaceWeight} кг`
                    : x.name,
              }));
            })
            .value();
        })
        .value();

      const MIN_PRICE = Math.min(...service.offers.map((x) => x.total));

      const availableSegmentsIds = _.uniq(
        service.offers.map((x) => x.flightSegmentsUid.join('-'))
      );
      const availableSegments = [...segments].filter((x) =>
        availableSegmentsIds.includes(x.id)
      );

      return {
        segments: availableSegments,
        groupedSegments,
        offers,
        minPrice: MIN_PRICE,
        type: service.type,
      };
    };

export function createServiceAddictionalInfo(
  service
) {
  const result = _(service.offers)
    .map((x, key) => {
      const passengers = _(x)
        .map((x, key) => {
          const offers = _(x)
            .filter((x) => x.checked)
            .map((x) => {
              let name = x.name;
              if (service.type === AncillaryServiceType.Luggage) {
                name = x.luggageInfo
                  ? `Багаж до ${x.luggageInfo.onePlaceWeight} кг`
                  : 'Без багажа';
              }
              return { price: x.cost, name, key: x.key };
            })
            .value();

          return {
            key,
            offers,
            price: _(offers).reduce((acc, x) => acc + x.price, 0),
          };
        })
        .filter((x) => x.offers.length > 0)
        .value();
      return {
        segmentName: service.groupedSegments[key]?.route,
        key,
        passengers,
        price: _(passengers).reduce((acc, x) => acc + x.price, 0),
      };
    })
    .filter((x) => x.passengers.length > 0)
    .value();
  return result;
}

export const createServices = (
  services,
  tariff
) => {
  const cb = createServiceFunc(tariff);
  return groupServicesByType(services || [])
    .map(cb)
    .map((x) => ({ ...x, addictionalInfo: createServiceAddictionalInfo(x) }));
};

/**
 * if argument is null generate default object, else normalize it
 * Required for passenger and services reducers state
 * @param arg
 */

export function createPassengersArray(args) {
  if ((args.passengers || []).length < 1) {
    return [];
  }

  const passengers = args.passengers.map((x) => ({
    name: '',
    surname: '',
    secondName: '',
    ageCategoryDescription: Helper.translatePassengerAgeCategory(x.ageCategory),
    documentType: x.ageCategory === 'ADULT' ? 'PASSPORT' : 'BIRTH_CERTIFICATE',
    ageCategory: x.ageCategory,
    uid: x.uid,
  }));
  return passengers;
}

export function setSegmentsAccessibility(state) {
  let availableSeatCount = 0;
  const segments = Object.entries(state.list).map(([key, x]) => {
    const count = x.filter((x) => x.seat === null).length;
    availableSeatCount += count;
    return {
      name: x[0].segmentName,
      haveEmptySelectedPlaces: count > 0,
      id: key,
    };
  });
  return {
    availableSeatCount,
    segmentsAccessibility: segments,
  };
}

export const checkAvailablityNormalizer = (arg) => {
  return {
    ...arg,
    frequentFlyerAirlines: arg.frequentFlyerAirlines,
    //error
    fares: createFares(arg),
    ancillaryServices: createServices(
      arg.fares[0].ancillaryServices,
      arg.fares[0].tariff
    ),
    passengers: createPassengersArray(arg),
    flights: createFlightsList(arg.fares[0].tariff.groups, arg.flight_Type),
  };
};

export function createSeatMapState(
  fare,
  passengers
) {
  const segments = {};

  fare.seatMap.forEach((x) => {
    segments[x.flightNo] = passengers
      .filter((x) => x.ageCategory !== PassengerAgeCategory.Infant)
      .map((y) => ({
        ...y,
        seat: null,
        segmentId: x.id,
        segmentName: `${x.from.code}-${x.to.code}`,
      }));
  });

  const pricesArr = _(fare.seatMap || [])
    .map((x) =>
      x.decks?.map((y) =>
        y.rows.map((z) =>
          z.seatGroups.map((d) => d.seats.map((g) => g.price.amount))
        )
      )
    )
    .flattenDeep()
    .sort((a, b) => a - b)
    .value();

  const priceArrUnique = _(pricesArr).uniq().value();
  const CHUNK_COUNT = priceArrUnique.length > 2 ? 3 : priceArrUnique.length;
  const CHUNK_SIZE = Math.ceil(priceArrUnique.length / CHUNK_COUNT);
  const pricesForColor = [];
  let count = 0;

  let i = 0;
  let j = 0;

  while (count < CHUNK_COUNT || i < priceArrUnique.length) {
    if (j === 0) {
      pricesForColor.push(priceArrUnique[i]);
      count += 1;
    }
    j += 1;
    i += 1;
    if (j === CHUNK_SIZE) {
      j = 0;
    }
  }

  if (!pricesForColor[CHUNK_COUNT - 1]) {
    pricesForColor[CHUNK_COUNT - 1] = priceArrUnique[priceArrUnique.length - 1];
  }

  const minPrice = Math.min(...pricesArr);
  const result = {
    minPrice,
    selectedPassengerId: passengers[0].uid,
    selectedSegmentNumber: fare.seatMap[0]?.flightNo || '',
    available: fare.seatMap.length > 0,
    totalPrice: 0,
    selectedSeatCount: 0,
    availableSeatCount: 0,
    segmentsAccessibility: [],
    loading: false,
    list: segments,
    priceArrForColors: pricesForColor,
  };

  return { ...result, ...setSegmentsAccessibility(result) };
}

function getInsuranceIcon(productType) {
  switch (productType) {
    case 'ANTICOVID':
      return insuranceCovidSrc;
    case 'Защита на время полета':
      return insuranceProtectionSrc;
    case 'Отмена поездки':
      return insuranceCancelSrc;
    case 'Страховка от задержки рейса':
    case 'Задержка рейса':
      return insuranceDelaySrc;
    case 'Гарантия хорошей погоды для туристов':
    case 'Гарантия хорошей погоды':
      return insuranceWeatherSrc;
    case 'Врач-online в поездку':
      return insuranceDoctorSrc;
  }
}

function getInsuranceDescription(productType) {
  switch (productType) {
    case 'ANTICOVID':
      return 'Нет ничего важнее Вашего здоровья. Получите выплату при заболевании в поездке.';
    case 'Защита на время полета':
      return 'Получите выплату на карту при задержке рейса, потере багажа и других страховых случаях.';
    case 'Отмена поездки':
      return 'Обезопасьте себя на случай отмены запланированной поездки.';
    case 'Врач-online в поездку':
      return 'Online-врач окажет вам помощь дистанционно в любой точке мира.';
    case 'Страховка от задержки рейса':
    case 'Задержка рейса':
      return 'Моментальная выплата от 3000 ₽ на карту, в случае задержки рейса от 3ч.';
    case 'Гарантия хорошей погоды для туристов':
    case 'Гарантия хорошей погоды':
      return 'Моментальная выплата 5000 ₽ на карту, в случае плохой погоды во время отдыха.';
  }
}

function getCompany(productType) {
  switch (productType) {
    case 'Задержка рейса':
    case 'Гарантия хорошей погоды':
    case 'Гарантия хорошей погоды для туристов':
    case 'Страховка от задержки рейса':
      return { name: 'Insurion', logo: insurionPath, phone: null };
    default:
      return {
        name: 'АльфаСтрахование',
        logo: alphastrahPath,
        phone: '8-499-785-0999',
      };
  }
}

function getLabel(productType) {
  switch (productType) {
    case 'ANTICOVID':
      return { color: '#daf0a2', text: 'Самое важное', icon: CovidDeath };
    case 'Гарантия хорошей погоды':
    case 'Гарантия хорошей погоды для туристов':
      return { color: '#96D9FF', text: 'Без дождя', icon: Sun };
    case 'Врач-online в поездку':
      return { color: '#DAF0A2', text: 'Для всей семьи', icon: Hearth };
    default:
      return null;
  }
}

function formatRisks(productType, risks) {
  switch (productType) {
    case 'ANTICOVID':
      return [
        {
          id: '',

          coverage: { value: 15000, currency: 'RUB' },
          description: 'в случае диагностики COVID-19',
        },
        {
          id: '',
          coverage: { value: 30000, currency: 'RUB' },
          description: 'в случае госпитализации с COVID-19',
        },
      ];
    case 'Защита на время полета':
      return risks.map((x) => {
        let description = x.description;

        if (x.description.includes('Потеря багажа')) {
          description = 'при пропаже багажа';
        } else if (x.description.includes('Задержка рейса')) {
          description = 'при задержке рейса';
        } else if (x.description.includes('Несчастный случай')) {
          description = 'в несчастном случае';
        } else if (x.description.includes('Задержка багажа')) {
          description = 'при задержке багажа';
        }

        return { ...x, description };
      });
    case 'Отмена поездки':
      return risks.map((x) => ({
        ...x,
        description:
          'в случае внезапной отмены поездки из-за отказа в визе, травмы, госпитализации и еще 13 причин',
      }));
    default:
      return risks;
  }
}

function getWordBeforPrice(productType) {
  switch (productType) {
    case 'Страховка от задержки рейса':
    case 'Задержка рейса':
      return 'от';
    case 'Гарантия хорошей погоды для туристов':
    case 'Гарантия хорошей погоды':
      return '';
    default:
      return 'до';
  }
}

function getSpecificationDoc(productType) {
  switch (productType) {
    case 'Страховка от задержки рейса':
    case 'Задержка рейса':
    case 'Гарантия хорошей погоды для туристов':
    case 'Гарантия хорошей погоды':
      return '/docs/reno.pdf';
    default:
      return 'http://www.alfastrah.ru/docs/rules_SP_230617.pdf';
  }
}

function getOffertaUri(productType) {
  switch (productType) {
    case 'ANTICOVID':
      return 'https://www.alfastrah.ru/docs/Offer_anticovid_2_avia_247.pdf';
    case 'Защита на время полета':
      return 'https://www.alfastrah.ru/docs/Offer_bg_zv_ns_247.pdf';
    case 'Отмена поездки':
      return 'http://www.alfastrah.ru/docs/Offer_nsp_247_se.pdf';
    case 'Врач-online в поездку':
      return 'https://www.alfastrah.ru/docs/telemed_ns_offer.pdf';
    default:
      return null;
  }
}

export function normalizeGetInsuranceCalculationResponse(
  args
) {
  const res = _(args.offers)
    .map((item) => {
      return {
        ...item,
        offerByProducts: item.offerByProducts.map((offer) => {
          const productType = (offer.product.name || '').trim();

          return {
            ...offer,
            checked: false,
            wordBeforePrice: getWordBeforPrice(productType),
            iconSrc: getInsuranceIcon(productType),
            company: getCompany(productType),
            label: getLabel(productType),
            loading: false,
            offertaUri: getOffertaUri(productType),
            specificationUri: getSpecificationDoc(productType),
            risks: formatRisks(productType, offer.risks || []).sort(
              (a, b) => a.coverage.value - b.coverage.value
            ),
            product: {
              ...offer.product,
              description: getInsuranceDescription(productType),
            },
          };
        }),
      };
    })
    .value();

  return res;
}
