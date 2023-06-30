import React from 'react';
import CurveIcon from '../../../assets/media/shared/curve.svg'
import FSIcon from '../../../assets/media/shared/fs-logo.svg'
import './Loader.scss';

export default function Loader() {

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (  
    <div className='fs-ui-loader'>
      <div className='fs-ui-loader__overlay'/>
      <div className='fs-ui-loader__icon'>
        <div className='fs-ui-loader-circle'>
          <img className='fs-ui-loader-circle__curve' src={CurveIcon}/>
        </div>
        <img className='fs-ui-loader__icon__company' src={FSIcon}/>
      </div>
    </div>
  );
};