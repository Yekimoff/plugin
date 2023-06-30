import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import {
  setPassengerName,
  setPassengerSecondName,
  setPassengerSurname,
} from '../../../store/booking';
import Text from '../../shared/Typography';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import {
  Select,
  DatePicker,
  Field,
  RadioGroup,
  Checkbox,
  NumberTooltip,
  NameTooltip
} from '../../shared';
// import AncilllaryServices from './AncillaryServices';
import { useMediaQuery } from 'react-responsive';
import AdultPath from '../../../assets/media/passenger-type/adult.svg';
import ChildPath from '../../../assets/media/passenger-type/child.svg';
import InfantPath from '../../../assets/media/passenger-type/infant.svg';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';


export async function getCityList(str) {
  try {
    const account = window['fs-flight-search-widget-config'] ? window['fs-flight-search-widget-config'].account : null;
    let headers = {};
    if (account) {
      headers = {'X-Account': account, 'X-Correlation-ID': sessionStorage.getItem('X-Correlation-ID')}
    }
    const response = await fetch(
      `https://avia-new.fstravel.com/api/wl-plugin/external/references/countries/search?value=${str}`, {
        headers: headers
        }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    // console.log(e);
  }
}

const Wrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #737373;
  margin-bottom: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Header = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    ${Text} {
      font-weight: bold;
    }
    @media (max-width: 780px) {
      margin-bottom: 20px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: baseline;
      ${Text} {
        font-weight: 600;
      }
    }
  `,
};

const FormBlockNew = styled.div`
  display: grid;
  grid-template-areas:
    'field-1 field-2 field-3'
    'field-4 field-4 field-4'
    'field-5 field-6 field-6'
    'field-7 field-8 field-8'
    'field-9 field-10 .';
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  row-gap: 30px;

  .custom-input {
    width: 100%;
  }
  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 20px;
    grid-template-areas:
      'field-6'
      'field-1'
      'field-2'
      'field-3'
      'field-4'
      'field-5'
      'field-7'
      'field-8'
      'field-9'
      'field-10';
  }

  & .field-1 {
    grid-area: field-1;
  }
  & .field-2 {
    grid-area: field-2;
  }
  & .field-3 {
    grid-area: field-3;
  }
  & .field-4 {
    grid-area: field-4;
  }
  & .field-5 {
    grid-area: field-5;
  }
  & .field-6 {
    grid-area: field-6;
    @media (max-width: 767px) {
      height: 56px;
    }
  }
  & .field-7 {
    grid-area: field-7;
  }
  & .field-8 {
    grid-area: field-8;
  }
  & .field-9 {
    grid-area: field-9;
  }
  & .field-10 {
    grid-area: field-10;
  }
  & .field-11 {
    grid-area: field-11;
  }
  & .field-12 {
    grid-area: field-12;
  }
  & .field-13 {
    grid-area: field-13;
  }
`;

const StyledField = styled(Field)`
  width: 100%;
`;

const AddPassangers = styled(Text)`
  margin-left: auto;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #4872f2;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => `
    ${theme.max('780px')} {
      margin-left:0px;
      margin-top: 15px;
    }`}
`;

const LoyalityBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  row-gap: 30px;
  grid-template-areas: 
    ${({ checked }) =>
    checked
      ? `'field-1 field-1 field-1'
    'field-2 field-3 .';`
      : `'field-1 field-1 field-1';`}
    
  margin-top: 30px;
  .custom-input {
    width: 100%;
  }

  @media (max-width: 1023px) {
    margin-top: 15px;
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 20px;
    display: block;
    & > div {
      margin-bottom: 30px;
    }
    & > :last-child {
      margin-bottom: 0;
    }

  }
  & .field-1 {
    grid-area: field-1;
  }
  & .field-2 {
    grid-area: field-2;
  }
  & .field-3 {
    grid-area: field-3;
  }
`;

const PassengerIcon = styled.img`
  width: 30px;
  height: 30px;
  @media (max-width: 767px) {
    width: 25px;
    height: 25px;
  }
`;

const LoyalityCheckboxWrapper = styled.div``;

const PassengerItem = ({
  index,
  onChange,
  frequentFlyerAirlines,
  ...props
}) => {
  const isMobile = useMediaQuery({maxWidth: 767}); 
  const dispatch = useDispatch();

  const formik = useFormikContext();

  const airlines = React.useMemo(
    () =>
      (frequentFlyerAirlines || []).map((x) => ({
        label: x.nameRus || x.nameEng || x.code,
        value: x.code,
      })),
    [frequentFlyerAirlines.length]
  );

  const handleTicketClassChange = (value) => {
    formik.setFieldValue(`passengers.${index}.sex`, value);
  };

  const [isLoyalVisibile, setLoyalVisibility] = React.useState(false);

  const errors = formik.errors.passengers || [];
  const error = errors[index]
    ? errors[index]
    : {};
  const { touched, setFieldTouched } = formik;
  const isTouched =
    touched.passengers && touched.passengers[index]
      ? touched.passengers[index]
      : {};

  const DocumentType = React.useMemo(() => {
    switch (props.ageCategory) {
      case 'ADULT': {
        const arr = [
          { value: 'PASSPORT', label: 'Паспорт РФ' },
          { value: 'INTERNATIONAL_PASSPORT1', label: 'Заграничный паспорт' },
        ]
        if (props.birthDate && moment().diff(moment(props.birthDate), 'year') >= 12 && moment().diff(moment(props.birthDate), 'year') <= 14) {
          arr.push({ value: 'BIRTH_CERTIFICATE', label: 'Свидетельство о рождении' });
        }
        if (props.citizenship !== 'RU') {
          arr.push({ value: 'NationalPassport', label: 'Нац. паспорт' });
          arr.push({ value: 'INTERNATIONAL_PASSPORT', label: 'Другой документ' });
        }
        return arr;
      }
      default:
        {
          const arr = [
            { value: 'BIRTH_CERTIFICATE', label: 'Свидетельство о рождении' },
            { value: 'INTERNATIONAL_PASSPORT1', label: 'Заграничный паспорт' },
          ];
          if (props.citizenship !== 'RU') {
            arr.push({ value: 'NationalPassport', label: 'Нац. паспорт' });
            arr.push({ value: 'INTERNATIONAL_PASSPORT', label: 'Другой документ' });
          }
          return arr;
        }
    }
  }, [props.ageCategory, props.birthDate, props.citizenship]);

  const [{ documentType, citizenship }, setSelectVal] = useState({
    documentType: DocumentType[0],
    citizenship: { value: 'RU', label: 'Россия' },
  });

  useEffect(() => {
    formik.setFieldValue(
      `passengers.${index}.documentType`,
      documentType.value
    );
    formik.setFieldValue(`passengers.${index}.citizenship`, citizenship.value);
  }, []);

  const citizenshipDefault = { value: 'RU', label: 'Россия' };

  const handleBirthDateChange = (val) => {
    formik.setFieldValue(`passengers.${index}.birthDate`, val);
  };

  const setPassengerNameDebounced = React.useMemo(
    () =>
      _.debounce((args) => {
        dispatch(setPassengerName(args));
      }, 400),
    []
  );

  const setPassengerSurnameDebounced = React.useMemo(
    () =>
      _.debounce((args) => {
        dispatch(setPassengerSurname(args));
      }, 400),
    []
  );

  const setPassengerSecondNameDebounced = React.useMemo(
    () =>
      _.debounce((args) => {
        dispatch(setPassengerSecondName(args));
      }, 400),
    []
  );

  const handleNameChange = (e) => {
    setPassengerNameDebounced({ passengerIndex: index, value: e.target.value });
    formik.setFieldValue(`passengers.${index}.name`, e.target.value);
  };

  const handleSurnameChange = (
    e
  ) => {
    setPassengerSurnameDebounced({
      passengerIndex: index,
      value: e.target.value,
    });
    formik.setFieldValue(`passengers.${index}.surname`, e.target.value);
  };

  const handleSecondNameChange = (
    e
  ) => {
    setPassengerSecondNameDebounced({
      passengerIndex: index,
      value: e.target.value,
    });
    formik.setFieldValue(`passengers.${index}.secondName`, e.target.value);
  };

  const handledateOfIssue = (val) => {
    formik.setFieldValue(`passengers.${index}.dateOfIssue`, val);
  };

  const handleBlur = (e) => {
    const target = e.target;
    setFieldTouched(`passengers.${index}.${target.name}`, true, true);
  };

  const cityList = async (str) => {
    const response = await getCityList(str);
    return response
      ? response.data.map((city) => ({
        label: city.nameRus,
        value: city.isoCode,
      }))
      : [];
  };

  const handleDocumentTypeChange = (val) => {
    setSelectVal((select) => ({ ...select, documentType: val }));
    formik.setFieldValue(`passengers.${index}.documentType`, val.value);
    return;
  };

  const handleAviacompanyChange = (val) => {
    formik.setFieldValue(`passengers.${index}.loyality.code`, val.value);
    return;
  };

  const handleCitizenshipChange = (val) => {
    setSelectVal((select) => ({ ...select, citizenship: val }));
    formik.setFieldValue(`passengers.${index}.citizenship`, val.value);
    return;
  };

  const handleCheckboxChange = (e) => {
    formik.setFieldValue(
      `passengers.${index}.secondNameRequired`,
      !e.target.checked
    );
    if (e.target.checked) {
      formik.setFieldValue(`passengers.${index}.secondName`, '');
    }
  };

  const handleChangeLoyalInput = (
    e
  ) => {
    const value = e.target.value;
    formik.setFieldValue(`passengers.${index}.loyality.value`, value);
  };

  const documentMask = React.useMemo(() => {
    switch (documentType.value) {
      case 'PASSPORT':
        return props.citizenship === 'RU' ? '9999-999999' : '';

      case 'INTERNATIONAL_PASSPORT1':
        return props.citizenship === 'RU' ? '99 9999999' : '';

      case 'BIRTH_CERTIFICATE':
        return '';

      default:
        return '';
    }
  }, [documentType.value, props.citizenship]);

  const numberPlaceholder = React.useMemo(() => {
    if (
      documentType.value === 'BIRTH_CERTIFICATE' &&
      citizenship.value === 'RU'
    ) {
      return 'XII-AA 000000';
    } else if (documentType.value === 'PASSPORT') {
      return '9999-999999';
    } else if (documentType.value === 'INTERNATIONAL_PASSPORT1') {
      return '99 9999999';
    } else {
      return isMobile ? undefined : 'Номер';
    }
  }, [isMobile, documentType.value, citizenship]);

  const translateName = (value, nameRus) => {
    formik.setFieldValue(`passengers.${index}.name`, value);
  };

  const translateSurname = (value, name) => {
    formik.setFieldValue(`passengers.${index}.surname`, value);
  };

  const translateSecondName = (value, name) => {
    formik.setFieldValue(`passengers.${index}.secondName`, value);
  };

  const handleBlurName = () => {
    formik.setFieldTouched(`passengers.${index}.name`, true);
  };

  const handleBlurSurname = () => {
    formik.setFieldTouched(`passengers.${index}.surname`, true);
  };

  const handleBlurSecondName = () => {
    formik.setFieldTouched(`passengers.${index}.secondName`, true);
  };

  return (
    <Wrapper>
      <Header.Wrapper>
        <Text size="normal" color="black">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PassengerIcon
              src={getPassengerIconPath(props.ageCategory)}
              alt=""
            />
            <span style={{ marginLeft: 8, marginRight: 8 }}>
              Пассажир{' '}
              {`${index + 1}, ${props.ageCategoryDescription.toLowerCase()}`}
            </span>
          </div>
        </Text>
      </Header.Wrapper>
      <FormBlockNew>
        <div className="field-1">
          <NameTooltip
            wrapperClassName="custom-input"
            error={
              error.surname && isTouched.surname ? error.surname : undefined
            }
            onChange={handleSurnameChange}
            onClickSuggest={translateSurname}
            onBlur={handleBlurSurname}
            label="Фамилия"
            autoComplete="anyrandomstring1"
            value={props.surname}
          />
        </div>
        <div className="field-2">
          <NameTooltip
            wrapperClassName="custom-input"
            error={error.name && isTouched.name ? error.name : undefined}
            onChange={handleNameChange}
            onBlur={handleBlurName}
            onClickSuggest={translateName}
            label="Имя"
            autoComplete="anyrandomstring2"
            value={props.name}
          />
        </div>
        <div className="field-3">
          <NameTooltip
            wrapperClassName="custom-input"
            error={
              error.secondName &&
                isTouched.secondName &&
                props.secondNameRequired
                ? error.secondName
                : undefined
            }
            onClickSuggest={translateSecondName}
            disabled={!props.secondNameRequired}
            onChange={handleSecondNameChange}
            onBlur={handleBlurSecondName}
            label="Отчество"
            autoComplete="anyrandomstring3"
            value={props.secondName}
          />
        </div>
        <div className="field-4">
          <Checkbox
            onChange={handleCheckboxChange}
            type="squar"
            label="Отчество отстутствует"
            checked={!props.secondNameRequired}
          />
        </div>

        <DatePicker
          className="field-5"
          value={props.birthDate}
          onChange={handleBirthDateChange}
          label="Дата рождения"
          error={
            error.birthDate && isTouched.birthDate ? error.birthDate : undefined
          }
          isBirthDate={true}
        />

        <div className="field-6">
          <Label>Пол</Label>
          <RadioGroup
            name={`passenger-${index}`}
            flex
            defaultValue={'m'}
            onChange={handleTicketClassChange}
            items={[
              { value: 'm', label: 'Мужской' },
              { value: 'f', label: 'Женский' },
            ]}
          />
        </div>

        <div className="field-7">
          <Label>Гражданство</Label>
          <AsyncSelect
            onChange={handleCitizenshipChange}
            styles={{
              indicatorSeparator: (provided, state) => ({
                ...provided,
                visibility: 'hidden',
              }),

              input: (provided, state) => ({
                ...provided,
                fontFamily: 'Open Sans',
                color: '#3C3C3C',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '18px',
              }),
              valueContainer: (provided, state) => ({
                ...provided,
                padding: 0,
                paddingLeft: '12px',
              }),
              container: (provided, state) => ({
                ...provided,
                padding: 0,
              }),
              control: (provided, { isFocused, ...state }) => {
                const border = isFocused
                  ? '1px solid #3C3C3C !important'
                  : '1px solid #DCDCDC';

                const borderColor = isFocused ? '#3C3C3C' : '#DCDCDC';
                const boxShadow = 'none';
                return {
                  ...provided,
                  minHeight: 42,
                  border,
                  borderColor,
                  boxShadow,
                };
              },
              menu: (provided, state) => ({
                ...provided,
                zIndex: 100,
              }),
            }}
            noOptionsMessage={() => 'Ничего не найдено'}
            loadOptions={async (inputValue, callback) => {
              callback(await cityList(inputValue));
            }}
            defaultOptions={[
              { value: 'RU', label: 'Россия' },
              { value: 'KZ', label: 'Казахстан' },
              { value: 'GE', label: 'Грузия' },
              { value: 'UZ', label: 'Узбекистан' },
              { value: 'AZ', label: 'Азербайджан' },
              { value: 'BY', label: 'Беларусь' }
            ]}
            defaultValue={citizenshipDefault}
            cacheOptions
            value={citizenship}
          />
        </div>
        <div className="field-8">
          <Select
            label="Выберите документ"
            onChange={handleDocumentTypeChange}
            isSearchable={false}
            value={documentType}
            defaultValue={DocumentType[0]}
            options={DocumentType}
          />
        </div>
        <NumberTooltip
          handleChange={(event) => {
            formik.setFieldValue(
              `passengers.${index}.number`,
              event.target.value
            );
          }}
          handleBlur={handleBlur}
          mask={documentMask}
          value={props.number}
          className="field-9"
        >
          <StyledField
            wrapperClassName="custom-input"
            error={error.number && isTouched.number ? error.number : undefined}
            label="Серия и номер"
            placeholder={numberPlaceholder}
            name="number"
          />
        </NumberTooltip>

        {(documentType.value === 'INTERNATIONAL_PASSPORT1' ||
          documentType.value === 'INTERNATIONAL_PASSPORT') && (
            <DatePicker
              className="field-10"
              value={props.dateOfIssue}
              onChange={handledateOfIssue}
              label="Срок действия"
              placeholder="ДД.ММ.ГГГГ"
              error={
                isTouched.dateOfIssue && error.dateOfIssue
                  ? error.dateOfIssue
                  : undefined
              }
            />
          )}
      </FormBlockNew>
      <LoyalityBlock checked={isLoyalVisibile}>
        {airlines.length > 0 && (
          <LoyalityCheckboxWrapper className="field-1">
            <Checkbox
              onChange={() => setLoyalVisibility((x) => !x)}
              type="squar"
              label="У меня есть карта лояльности"
            />
          </LoyalityCheckboxWrapper>
        )}
        {isLoyalVisibile && (
          <>
            <div className="field-2">
              <Select
                label="Авиакомпания"
                onChange={handleAviacompanyChange}
                isSearchable={false}
                placeholder=""
                // value={documentType}
                // defaultValue={DocumentType[0]}
                options={airlines}
              />
            </div>
            <div className="field-3">
              <StyledField
                wrapperClassName="custom-input"
                onChange={handleChangeLoyalInput}
                label="№ карты лояльности"
                name="loyalityValue"
                value={props.loyality.value}
              />
            </div>
          </>
        )}
      </LoyalityBlock>
    </Wrapper>
  );
};

function getPassengerIconPath(type) {
  switch (type) {
    case 'ADULT':
      return AdultPath;
    case 'CHILD':
      return ChildPath;
    case 'INFANT':
      return InfantPath;
    default:
      return '';
  }
}

export default PassengerItem;
