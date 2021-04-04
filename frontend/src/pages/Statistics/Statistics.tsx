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
  const [statisticsForSecondChart, setStaticticsForSecontChart] = useState<GetStatisticsType[]>([])
  const [isEpmty, setIsEmpty] = useState<boolean>(false)

  const getWordsForSecondStatistic = useCallback((): Array<GetStatisticsType> => {
    const arr: Array<GetStatisticsType> = []
    for (let i = 0; i < statistics.length; i += 1) {
      if (i === 0) {
        arr.push(statistics[i])
      } else {
        const newStatistic: GetStatisticsType = {
          count: statistics[i].count + arr[i - 1].count,
          date: statistics[i].date,
        }
        arr.push(newStatistic)
      }
    }
    return arr
  }, [statistics])

  const getStatistics = useCallback(async () => {
    if (userId) {
      const statistic = await StatisticsApi.get(userId)
      setStatistics(statistic)
      setStaticticsForSecontChart(getWordsForSecondStatistic())
    }
    // eslint-disable-next-line
  }, [userId, getWordsForSecondStatistic])

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
    data: statisticsForSecondChart,
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
