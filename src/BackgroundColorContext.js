// BackgroundColorContext.js

import React, { createContext, useState, useContext } from 'react';

const BackgroundColorContext = createContext();

export const useBackgroundColor = () => useContext(BackgroundColorContext);

export const BackgroundColorProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('white');

  const changeBackgroundColor = (language) => {
    switch (language) {
      case 'hi':
        setBackgroundColor('blue');
        break;
      case 'zh':
        setBackgroundColor('green');
        break;
      case 'fr':
        setBackgroundColor('yellow');
        break;
      default:
        setBackgroundColor('white');
        break;
    }
  };

  return (
    <BackgroundColorContext.Provider value={{ backgroundColor, changeBackgroundColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};
