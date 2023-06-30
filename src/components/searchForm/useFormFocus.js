import React from 'react';



const Steps = React.createContext(null);

export const useFocus = () => React.useContext(Steps);

export const FocusFormProvider= ({ children }) => {
  const [focus, setFocus] = React.useState(null);

  return (
    <Steps.Provider value={{ focus, setFocus }}>{children}</Steps.Provider>
  );
};
