import React from 'react';

import {FocusFormProvider} from '../useFormFocus';
import SearchForm from './SearchForm';



export default function SearchFormWrapper({setChosenStaticPage, tokenData}) {
  return (
    <FocusFormProvider>

      <SearchForm setChosenStaticPage={setChosenStaticPage} tokenData={tokenData}/>
    </FocusFormProvider>
  );
}