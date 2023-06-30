import React from 'react';
import './Category.scss';
import arrowIcon from '../../../assets/media/flight-search/triangle.svg';


export function Category({
  name,
  active = false,
  children,
  resetAvailable = false,
  onReset,
  disableBottomLine,
}) {
  const [isActive, setActive] = React.useState(active);

  React.useEffect(() => {
    setActive(active);
  }, [active]);

  const handleClick = React.useCallback((e) => {
      e.stopPropagation();
      console.log('click');
      setActive((isActive) => !isActive);
    }, []);

  const handleReset = (e) => {
    e.stopPropagation();
    typeof onReset == 'function' && onReset();
  };

  return (
    <div className={`fs-filter-category${isActive ? ' fs-filter-category--active' : ''}`}>
      <div >
        <div className='fs-filter-category__head' onClick={handleClick}>
          <span className='fs-filter-category__head__title'>{name}</span>
          <img className='fs-filter-category__head__icon' src={arrowIcon} />
          {/* {resetAvailable && (
            <CategoryResetButtonWrapper>
              <CategoryResetButton onClick={handleReset} />
            </CategoryResetButtonWrapper>
          )} */}
        </div>
        <div className='fs-filter-category__content'>{children}</div>
      </div>
    </div>
  );
};

export default Category;
