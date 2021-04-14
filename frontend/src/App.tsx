import React from 'react'
import Router from './router/Router'
import { IntlProvider, LOCALES } from './intl'
import useTypedSelector from './hooks/useTypedSelector'
import './App.scss'

function App(): JSX.Element {
  const { language } = useTypedSelector((state) => state.appReducer)
  return (
    <div className="App">
      <IntlProvider locale={LOCALES[language]}>
        <Router />
      </IntlProvider>
    </div>
  )
}

export default App
