// components/LanguageSelector.js

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBackgroundColor } from '../BackgroundColorContext'; // Adjust path as necessary
import './LanguageSelector.css'; // Import your CSS file for styling

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const { changeBackgroundColor } = useBackgroundColor();


  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);
    changeBackgroundColor(language); // Call changeBackgroundColor from context
  };

  return (
    <div className="language-selector">
      <button className="lang-button" onClick={() => changeLanguage('en')}>English</button>
      <button className="lang-button" onClick={() => changeLanguage('es')}>Spanish</button>
      <button className="lang-button" onClick={() => changeLanguage('hi')}>Hindi</button>
      <button className="lang-button" onClick={() => changeLanguage('pt')}>Portuguese</button>
      <button className="lang-button" onClick={() => changeLanguage('zh')}>Chinese</button>
      <button className="lang-button" onClick={() => changeLanguage('fr')}>French</button>
      
      
    </div>
  );
};

export default LanguageSelector;
