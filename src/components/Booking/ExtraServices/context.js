import React from 'react';

const ModalContext = React.createContext(null);

export const useModalState = () => React.useContext(ModalContext);

export const Provider = ({ children }) => {
  const [visibility, setVisibility] = React.useState(null);
  const hideModal = () => setVisibility(null);
  const showModal = (x) => setVisibility(x);
  return (
    <ModalContext.Provider value={{ visibility, hideModal, showModal }}>
      {children}
    </ModalContext.Provider>
  );
};
