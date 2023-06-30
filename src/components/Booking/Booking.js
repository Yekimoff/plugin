import React from 'react';
import './Booking.scss';
import TimeLimit from './TimeLimit';
import ContactInformation from './ContactInformation';
import FlightFares from './FlightFares';
import Passengers from './PassengersBlock';
import Insurances from './Insurances';
import ExtraServices, {ExtraServicesProvider} from './ExtraServices';
import RightSide from './RightSide';
import { useDispatch,useSelector } from 'react-redux';
import { 
  bookFlightRequest,
  selectFlightRequest,
  bookingPurify,
  PassengerAgeCategory,
  hideInsuranceNotification,
  getBookingTicketState
} from '../../store/booking'
import Loader from '../shared/Loader';
import FlighDetail from './FlightDetail';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

export default function Booking(props) {
  const {
    booking: {
      passengers,
      ticket: { loading, initialized, flights },
      insurance,
    },
  } = useSelector((state) => state);

  const meta = useSelector(x => x.router.location.meta);
  const dispatch = useDispatch();
  React.useEffect(() => {
    // e3bf2ce9-bad1-4f30-8591-9c21b173d513/2/0,0

    // console.log(state.router.location.meta);
    // const data = {
    //   searchId: 'e3bf2ce9-bad1-4f30-8591-9c21b173d513',
    //   groupIndex: 2,
    //   flights: [
    //     0,
    //     0
    //   ]
    // }
    dispatch(selectFlightRequest({
      flights: meta.flights,
      group: meta.groupIndex,
      id: meta.searchId,
    }));
  },[]);

  const FormikValidationSchema = React.useMemo(() => {
    const lastSegmentDate = flights
      ? new Date(
        flights[flights.length - 1].segments[
          flights[flights.length - 1].segments.length - 1
        ].toDate
      )
      : new Date();

    const MIN_DATE_OF_BIRTH = new Date();
    MIN_DATE_OF_BIRTH.setFullYear(new Date().getFullYear() - 100);

    return yup.object().shape({
      passengers: yup.array().of(
        yup
          .object()
          .shape({
            name: yup
              .string()
              .matches(/^[a-zA-Z]+$/, 'Только латинские буквы')
              .required('Заполните'),
            surname: yup
              .string()
              .matches(/^[a-zA-Z]+$/, 'Только латинские буквы')
              .required('Заполните'),
            secondName: yup
              .string()
              .when('secondNameRequired', {
                is: (value) => !!value,
                then: yup
                  .string()
                  .matches(/^[a-zA-Z]+$/, 'Только латинские буквы')
                  .required('Заполните'),
                otherwise: yup
                  .string()
                  .matches(/^[a-zA-Z]+$/, 'Только латинские буквы'),
              })
              .nullable(),
            birthDate: yup
              .date()
              .min(MIN_DATE_OF_BIRTH, 'Неправильная дата рождения')
              .when('ageCategory', {
                is: (value) => !!(value === PassengerAgeCategory.Infant),
                then: yup
                  .date()
                  .test(
                    'infant',
                    'Некоретная дата рождения для младенца',
                    function (value) {
                      if (value === null || value === undefined) {
                        return true;
                      }
                      const years = moment
                        .duration(
                          moment()
                            .startOf('day')
                            .diff(moment(value).startOf('day'))
                        )
                        .years();
                      return years <= 2;
                    }
                  )
                  .required('Заполните')
                  .nullable(),
                otherwise: yup
                  .date()
                  .when('ageCategory', {
                    is: (value) => !!(value === PassengerAgeCategory.Child),
                    then: yup
                      .date()
                      .test(
                        'infant',
                        'Некорректная дата рождения для ребёнка',
                        function (value) {
                          if (value === null || value === undefined) {
                            return true;
                          }
                          const years = moment
                            .duration(
                              moment()
                                .startOf('day')
                                .diff(moment(value).startOf('day'))
                            )
                            .years();
                          return years > 2 && years <= 12;
                        }
                      )
                      .required('Заполните')
                      .nullable(),
                    otherwise: yup.date().required('Заполните').nullable(),
                  })
                  .required('Заполните')
                  .nullable(),
              })
              .test('not alive', 'Некорректная дата рождения', (v) => {
                return v?.getFullYear() > 1900;
              })
              .nullable(),

            number: yup
              .string()
              .when('citizenship', {
                is: (value) => !!(value === 'RU'),
                then: yup.string().when('documentType', {
                  is: (value) => !!(value === 'PASSPORT'),
                  then: yup
                    .string()
                    .trim()
                    .matches(/\d{4}-?\d{6}/, 'Невалидный номер документа')
                    .required('Заполните'),
                  otherwise: yup.string().when('documentType', {
                    is: (value) => !!(value === 'INTERNATIONAL_PASSPORT1'),
                    then: yup.string().trim().required('Заполните'),
                    otherwise: yup.string().when('documentType', {
                      is: (value) => !!(value === 'BIRTH_CERTIFICATE'),
                      then: yup
                        .string()
                        .trim()
                        .matches(
                          /^[IXV]{1,5}-?[А-ЯЁA-Z]{2,5}\s?№?\s?\d{6}$/,
                          'Невалидный номер документа'
                        )
                        .required('необходимо заполнить'),
                      otherwise: yup.string(),
                    }),
                  }),
                }),
                otherwise: yup.string(),
              })
              .test('not email', 'Спецсимволы запрещены', (v) => {
                return (
                  !v?.includes('@') && !v?.includes('.') && !v?.includes('!')
                );
              }),
            dateOfIssue: yup.date().when('documentType', {
              is: (value) =>
                !!(
                  value === 'INTERNATIONAL_PASSPORT1' ||
                  value === 'INTERNATIONAL_PASSPORT'
                ),
              then: yup
                .date()
                .required('Заполните')
                .min(
                  lastSegmentDate,
                  'Паспорт истекает раньше последнего перелёта'
                )
                .nullable(),
              otherwise: yup.date().nullable().notRequired(),
            }),
          })
          .test({
            name: 'equal',
            test: function (value) {
              const isEqual =
                value.secondName === value.surname;

              if (isEqual) {
                return this.createError({
                  path: `passengers[${value.key}].secondName`,
                  message: 'Отчество и фамилия одинаковы',
                });
              }
              return true;
            },
          })
      ),
      phone: yup
        .string()
        .matches(
          /\+?7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}/,
          'Некоректный номер телефона'
        )
        .required('Заполните'),
      offerta: yup.boolean().when('isInsurancesChecked', {
        is: true,
        then: yup.boolean(),
        otherwise: yup.boolean().oneOf([true], 'Field must be checked'),
      }),
      isInsurancesChecked: yup.boolean(),
      offertaWithInsurances: yup.boolean().when('isInsurancesChecked', {
        is: true,
        then: yup.boolean().oneOf([true], 'Field must be checked'),
        otherwise: yup.boolean()
      }),
      email: yup.string().email('Неправильный формат').required('Заполните'),
      name: yup.string().required('Заполните'),
      citizenship: yup.string(),
    });
  }, [flights, insurance.status]);

  const initialPassengers = React.useMemo(() => {
    return passengers.map((x, key) => ({
      ...x,
      number: '',
      dateOfIssue: null,
      secondName: '',
      series: '',
      sex: 'm',
      secondNameRequired: true,
      loyality: { code: '', value: '' },
      citizenship: 'RU',
      key: key,
      birthDate: null,
    }));
  }, [passengers.length, flights]);

  const initialValues = {
    passengers: initialPassengers,
    phone: '',
    email: '',
    name: '',
    insurance: true,
    return: true,
    policy: true,
    offerta: false,
    isInsurancesChecked: !!insurance.list.offers.find(x => x.checked),
    offertaWithInsurances: false,
    emailOfferta: false,
    baggage: [],
  };


  if(loading) {
    return <Loader/>;
  }
  if(initialized) {
    return (
      <Formik
          initialValues={initialValues}
          validationSchema={FormikValidationSchema}
          onSubmit={(values) => {
            try {
              dispatch(
                bookFlightRequest({
                  ...values,
                  passengers: values.passengers.map((val) => ({
                    ...val,
                    number: val.number.replaceAll(/-|№|\s/g, ''),
                    documentType:
                      val.documentType === 'INTERNATIONAL_PASSPORT1'
                        ? 'INTERNATIONAL_PASSPORT'
                        : val.documentType,
                  })),
                })
              );
            } catch (e) {
              Sentry.captureException(e);
            }
          }}
        >
          {(s) => (
            <>
              <form className='fs-booking' autoComplete='off'>
                <span className='fs-booking__header'>Бронирование</span>
                <div className='fs-booking__content'>
                  <div className='fs-booking__content__left'>
                    <ExtraServicesProvider>
                      <TimeLimit duration='2 часа'/>
                      <FlighDetail/>
                      <FlightFares/>
                      <ExtraServices/>
                      <Insurances/>
                      <Passengers/>
                      <ContactInformation/>
                    </ExtraServicesProvider>
                  </div>
                  <div className='fs-booking__content__right'>
                    <div className='fs-booking__content__right__sticky'>
                      <RightSide/>
                    </div>
                  </div>
                </div>
            </form>
          </>
        )}
      </Formik>
    );
  }
  return null;
}