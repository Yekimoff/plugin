import React from 'react';
import './SuggestionList.scss';

export default function(props) {

  const [index,setIndex] = React.useState(null);

  const handleOnEnter = (e) => {
    setIndex(e.target.dataset.key);
  };

  const handleOnLeave = () => {
    setIndex(null);
  };

  const handleClick = () => {
    const x = props.items[index];
    props.onSelect({name: x.nameRus,code: x.iataCode});
  };


  return props.items.length > 0 ? (
    <div className='fs-suggestion'>
      <div className='fs-suggestion-container'>
        {props.items.map((x,key) => (
          <div 
            className={`fs-suggestion__item ${index === key ? 'fs-suggestion__item--focus' : ''}`}
            data-key={key}
            onMouseEnter={handleOnEnter}
            onMouseLeave={handleOnLeave}
            onClick={handleClick}
            key={key}
          >
            <div className='fs-suggestion__item__text'>
              <span className='fs-suggestion__item__text__title'>{x.nameRus}</span>
              <span className='fs-suggestion__item__text__description'>{x.country.nameRus}</span>
            </div>
            <span className='fs-suggestion__item__code'>{x.iataCode}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}