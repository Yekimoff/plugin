import React from 'react';

import {FocusFormProvider} from '../useFormFocus';
import SearchForm from './SearchForm';



export default function SearchFormWrapper({setChosenStaticPage}) {
  return (
    <FocusFormProvider>

      <SearchForm setChosenStaticPage={setChosenStaticPage}/>
    </FocusFormProvider>
  );
}