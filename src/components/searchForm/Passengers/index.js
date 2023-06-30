import React from 'react';
import './Passengers.scss';
import Counter from '../../shared/Counter';
import {useSelector,useDispatch} from 'react-redux';
import {changePassengers,changeFlightClass} from '../../../store/slices/FligthsSlice';
import Radio from '../../shared/Radio';

export default function(props) {
  const [modal,setModal] = React.useState(false);
  const {passengers,flightClass} = useSelector(s => s.flights.searchParams);
  const dispatch = useDispatch();

  const handleClassChange = (e) =>{ 
    dispatch(changeFlightClass(e.target.value))
  }

  const value = React.useMemo(() => {
    const { adults, children, infants } = passengers;
    const quantity = `${adults.count}${children.count ? `-${children.count}` : ''
      }${infants.count
        ? children.count
          ? `-${infants.count}`
          : `-0-${infants.count}`
        : ''
      }`;
      let name = 'эконом';
      switch(flightClass) {
        case 'comfort':
          name = 'комфорт';
          break;
        case 'business':
          name = 'бизнес';
          break;
        case 'first':
          name = 'первый класс';
          break;  
      }
    return `${quantity}, ${name}`;
  }, [passengers, flightClass]);

  return (
    <div className='fs-passengers__wrapper'>
      <button
        className='fs-passengers__button'
        onClick={() => setModal(x => !x)}
        name="passengers"
        type='button'
      >
        <label className='fs-passengers__button__label'>Пассажиры</label>
        <span>{value}</span>
        <svg
          className='fs-passengers__button__icon'
          width={24}
          height={24}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.4017 8.40686C18.3321 8.33702 18.2493 8.2816 18.1582 8.24379C18.0671 8.20598 17.9694 8.18652 17.8707 8.18652C17.7721 8.18652 17.6744 8.20598 17.5833 8.24379C17.4922 8.2816 17.4094 8.33702 17.3397 8.40686L11.2494 14.4987L5.15909 8.40686C5.01826 8.26603 4.82725 8.18691 4.62809 8.18691C4.42893 8.18691 4.23792 8.26603 4.09709 8.40686C3.95626 8.54769 3.87714 8.7387 3.87714 8.93786C3.87714 9.13703 3.95626 9.32803 4.09709 9.46886L10.7184 16.0902C10.7881 16.16 10.8708 16.2154 10.962 16.2533C11.0531 16.2911 11.1508 16.3105 11.2494 16.3105C11.3481 16.3105 11.4457 16.2911 11.5369 16.2533C11.628 16.2154 11.7107 16.16 11.7804 16.0902L18.4017 9.46886C18.4716 9.3992 18.527 9.31643 18.5648 9.22531C18.6026 9.1342 18.6221 9.03652 18.6221 8.93786C18.6221 8.83921 18.6026 8.74153 18.5648 8.65041C18.527 8.5593 18.4716 8.47653 18.4017 8.40686Z"
            fill="#B9B9B9"
          />
        </svg>
      </button>
      {modal && 
        <div className='fs-passengers__modal'>
          <div className='fs-passengers__modal__ppls-selector'>
              <div className='fs-passengers__modal__ppls-selector__category'>
                <div className='fs-passengers__modal__ppls-selector__category__desc'>
                  <span className='fs-passengers__modal__ppls-selector__category__desc__title'>Взрослые</span>
                  <span className='fs-passengers__modal__ppls-selector__category__desc__desc'>Старше 12 лет</span>
                </div>
                <Counter onCustomChange={(value) => {
                  dispatch(changePassengers({adults: value}));
                }}
                  value={passengers.adults.count}
                  min={passengers.adults.min}
                  max={passengers.adults.max}
                />
              </div>
              <div className='fs-passengers__modal__ppls-selector__category'>
                <div className='fs-passengers__modal__ppls-selector__category__desc'>
                  <span className='fs-passengers__modal__ppls-selector__category__desc__title'>Дети</span>
                  <span className='fs-passengers__modal__ppls-selector__category__desc__desc'>От 2 лет до 12 лет</span>
                </div>
                <Counter
                  onCustomChange={(value) => {
                    dispatch(changePassengers({children: value}));
                  }}
                  value={passengers.children.count}
                  min={passengers.children.min}
                  max={passengers.children.max}
                />
              </div>
              <div className='fs-passengers__modal__ppls-selector__category'>
                <div className='fs-passengers__modal__ppls-selector__category__desc'>
                  <span className='fs-passengers__modal__ppls-selector__category__desc__title'>Младенцы</span>
                  <span className='fs-passengers__modal__ppls-selector__category__desc__desc'>До 2 лет без места</span>
                </div>
                <Counter
                  onCustomChange={(value) => {
                    dispatch(changePassengers({infants: value}));
                  }}
                  value={passengers.infants.count}
                  min={passengers.infants.min}
                  max={passengers.infants.max}
                />
              </div>
          </div>
          <div className='fs-passengers__modal__flight-class'>
            <Radio onChange={handleClassChange} checked={flightClass === 'economy'} value='economy' label='Эконом'/>
            <Radio onChange={handleClassChange} checked={flightClass === 'comfort'} value='comfort' label='Комфорт'/>
            <Radio onChange={handleClassChange} checked={flightClass === 'business'} value='business' label='Бизнес'/>
            <Radio onChange={handleClassChange} checked={flightClass === 'first'} value='first' label='Первый класс'/>
          </div>
        </div>
      }
    </div>
  )
}