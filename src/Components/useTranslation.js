// ExampleComponent.js

import React from 'react';
import { useTranslation } from 'react-i18next';

function ExampleComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('make your dream career a reality')}</h1>
      <p>{t('about')}</p>
      <button>{t('contact')}</button>
    </div>
  );
}

export default ExampleComponent;

//have to add all keys after ward