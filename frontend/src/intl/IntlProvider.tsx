import React from 'react'
import { IntlProvider } from 'react-intl'

import messages from './messages'

type IntlType = {
  children: React.ReactNode,
  locale: 'ru-ru' | 'en-us',
}

const INTLProvider: (children: IntlType, locale: IntlType) => JSX.Element = ({
  children,
  locale,
}) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  )
}

export default INTLProvider
