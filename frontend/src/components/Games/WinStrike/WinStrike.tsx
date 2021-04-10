import React from 'react'
import { useIntl } from 'react-intl'
import './WinStrike.scss'

type WinStrikeTypes = {
  strike: number,
}

const WinStrike: React.FC<WinStrikeTypes> = ({ strike }) => {
  const intl = useIntl()
  return (
    <div className="win-strike">
      {intl.formatMessage({ id: 'win_strike' })}: {strike}
    </div>
  )
}

export default WinStrike
