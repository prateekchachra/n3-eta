import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { LANGUAGES } from './languages';
import STRING_CONSTANTS from './stringConstants';


export type LangProviderProps = {
    children: JSX.Element,
    locale: string,
}
const LangProvider = ({ children, locale = LANGUAGES.ENGLISH } : LangProviderProps) : JSX.Element =>  {
  return (
    <div className="provider">
      <IntlProvider
        locale={locale}
        textComponent={Fragment}
        messages={STRING_CONSTANTS[locale]}
      >
        {children}
      </IntlProvider>
    </div>
  );
}

export default LangProvider;