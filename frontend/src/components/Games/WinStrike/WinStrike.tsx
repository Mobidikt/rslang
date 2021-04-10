import React from 'react'
import './WinStrike.scss'

type StatisticsTypes = {
  strike: number,
}

const WinStrike: React.FC<StatisticsTypes> = ({ strike }) => {
  return <div className="win-strike">win strike: {strike}</div>
}

export default WinStrike
