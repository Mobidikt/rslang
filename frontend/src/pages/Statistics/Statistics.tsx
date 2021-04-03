/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback, useState } from 'react'
import { Line } from '@ant-design/charts'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import './Statistics.scss'
import StatisticsApi, { GetStatisticsType } from '../../services/StatisticsApi'
import useTypedSelector from '../../hooks/useTypedSelector'

const Statistics: React.FC = () => {
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { userWords } = useTypedSelector((state) => state.dictionaryReducer)
  const [statistics, setStatistics] = useState<Array<GetStatisticsType>>([])
  const [isEpmty, setIsEmpty] = useState<boolean>(false)

  const getStatistics = useCallback(async () => {
    if (userId) {
      const statistic = await StatisticsApi.get(userId)
      setStatistics(statistic)
    }
  }, [userId])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getStatistics()
  }, [getStatistics])

  useEffect(() => {
    if (userWords.length === 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }, [userWords])

  const config = {
    data: statistics,
    height: 400,
    xField: 'date',
    yField: 'count',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  }

  return (
    <div className="statistics">
      {userId ? (
        <>
          <h2>Долгосрочная Статистика</h2>
          {isEpmty ? (
            <h2>У вас ещё нет изученных слов</h2>
          ) : (
            <div className="statistics-container">
              <ResponsiveContainer width="45%" height={400}>
                <BarChart data={statistics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <Tooltip />
                  <Bar type="monotone" dataKey="count" fill="#1890ff" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
              <Line className="chart" {...config} />
            </div>
          )}
        </>
      ) : (
        <h2>Статистика доступна только авторизованным пользователям</h2>
      )}
    </div>
  )
}

export default Statistics
