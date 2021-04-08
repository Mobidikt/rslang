/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { Tabs, Card } from 'antd'
import { Line } from '@ant-design/charts'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import './Statistics.scss'
import StatisticsApi, { GetStatisticsType } from '../../services/StatisticsApi'
import useTypedSelector from '../../hooks/useTypedSelector'

const Statistics: React.FC = () => {
  const intl = useIntl()
  const { TabPane } = Tabs
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { userWords } = useTypedSelector((state) => state.dictionaryReducer)
  const [statistics, setStatistics] = useState<Array<GetStatisticsType>>([])
  const [statisticsForSecondChart, setStaticticsForSecontChart] = useState<GetStatisticsType[]>([])
  const [isEpmty, setIsEmpty] = useState<boolean>(false)
  const [circleDashArray, setCircleDashArray] = useState('100')

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
          <h2>{intl.formatMessage({ id: 'Long_Statistics' })}</h2>
          <div className="statistics__words">
            {intl.formatMessage({ id: 'Statistics__words' })} <h4>45</h4>
          </div>
          <div className="statistics__procent">
            {intl.formatMessage({ id: 'Statistics__procent' })} <h4>78</h4>
          </div>
          <Tabs defaultActiveKey="1" type="card" size="middle">
            <TabPane tab={intl.formatMessage({ id: 'Long_Statistics' })} key="1">
              {isEpmty ? (
                <h2>{intl.formatMessage({ id: 'not_words' })}</h2>
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
            </TabPane>
            <TabPane tab={intl.formatMessage({ id: 'Short_Statistics' })} key="2">
              <div className="statistics__card_wrapper">
                <Card className="statistics__card">
                  <h4>{intl.formatMessage({ id: 'savannah' })}</h4>
                  <div className="timer">
                    <div className="timer__number">75</div>
                    <svg
                      className="base-timer__svg"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                        <path
                          id="base-timer-path-remaining"
                          strokeDasharray={circleDashArray}
                          className="base-timer__path-remaining"
                          d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                          "
                        />
                      </g>
                    </svg>
                  </div>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">23</span>
                  </p>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__session' })}{' '}
                    <span className="text__big">14</span>
                  </p>
                </Card>
                <Card className="statistics__card">
                  <h4>{intl.formatMessage({ id: 'audiocall' })}</h4>
                  <div className="timer">
                    <div className="timer__number">75</div>
                    <svg
                      className="base-timer__svg"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                        <path
                          id="base-timer-path-remaining"
                          strokeDasharray={circleDashArray}
                          className="base-timer__path-remaining"
                          d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                          "
                        />
                      </g>
                    </svg>
                  </div>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">23</span>
                  </p>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__session' })}{' '}
                    <span className="text__big">14</span>
                  </p>
                </Card>
                <Card className="statistics__card">
                  <h4>{intl.formatMessage({ id: 'sprint' })}</h4>
                  <div className="timer">
                    <div className="timer__number">75</div>
                    <svg
                      className="base-timer__svg"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                        <path
                          id="base-timer-path-remaining"
                          strokeDasharray={circleDashArray}
                          className="base-timer__path-remaining"
                          d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                          "
                        />
                      </g>
                    </svg>
                  </div>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">23</span>
                  </p>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__session' })}{' '}
                    <span className="text__big">14</span>
                  </p>
                </Card>
                <Card className="statistics__card">
                  <h4>{intl.formatMessage({ id: 'gameOur' })}</h4>
                  <div className="timer">
                    <div className="timer__number">75</div>
                    <svg
                      className="base-timer__svg"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                        <path
                          id="base-timer-path-remaining"
                          strokeDasharray={circleDashArray}
                          className="base-timer__path-remaining"
                          d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                          "
                        />
                      </g>
                    </svg>
                  </div>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">23</span>
                  </p>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__session' })}{' '}
                    <span className="text__big">14</span>
                  </p>
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </>
      ) : (
        <h2>{intl.formatMessage({ id: 'statistics_authorized' })}</h2>
      )}
    </div>
  )
}

export default Statistics
