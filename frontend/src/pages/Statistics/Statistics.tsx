/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'
import { Tabs, Card } from 'antd'
import { Line } from '@ant-design/charts'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import './Statistics.scss'
import StatisticsApi, {
  GetStatisticsType,
  GetForShortTermStatistics,
} from '../../services/StatisticsApi'
import useTypedSelector from '../../hooks/useTypedSelector'

import gameCall from '../../assets/image/gameCallSBG.png'
import gameOur from '../../assets/image/gameOurSBG.png'
import gameSavannah from '../../assets/image/gameSavannahSBG.png'
import gameSprint from '../../assets/image/gameSprintSBG.png'
import SavannaGame from '../SavannaGamePage/SavannaGamePage'

type StatisticsForGames = {
  savanahh: number,
  ourGame: number,
  sprint: number,
  audioCall: number,
}

const Statistics: React.FC = () => {
  const intl = useIntl()
  const { TabPane } = Tabs
  const { userId } = useTypedSelector((state) => state.authReducer)
  const { userWords } = useTypedSelector((state) => state.dictionaryReducer)
  const [statistics, setStatistics] = useState<Array<GetStatisticsType>>([])
  const [shortStatisticsForGames, setShortStatisticsForGames] = useState<StatisticsForGames>()
  const [statisticsForSecondChart, setStaticticsForSecontChart] = useState<GetStatisticsType[]>([])
  const [isEpmty, setIsEmpty] = useState<boolean>(false)
  const [countLearnedWordsPerDay, setCountLearnedWordsPerDay] = useState<number>(0)
  const [procentRightWordsPerDay, setProcentRightWordsPerDay] = useState<number>(0)

  const [winWidth, setWidth] = useState(window.innerWidth)
  const [font, setFont] = useState('28px')

  const getStatistics = useCallback(async () => {
    if (userId) {
      const statistic = await StatisticsApi.get(userId)
      const shortStatistic: Array<GetForShortTermStatistics> = await StatisticsApi.getForShortTermStatistics(
        userId,
      )
      setCountLearnedWordsPerDay(shortStatistic.length)
      const rightAnswers = shortStatistic.filter((el) => el.isRight === true)
      const percent = (rightAnswers.length / shortStatistic.length) * 100
      setProcentRightWordsPerDay(Math.floor(percent))
      setStatistics(statistic)

      const statisticsForGames: StatisticsForGames = {
        savanahh: 0,
        ourGame: 0,
        sprint: 0,
        audioCall: 0,
      }
      for (let i = 0; i < shortStatistic.length; i += 1) {
        if (i === 0) {
          const { audioCall, ourGame, savannah, sprint } = shortStatistic[i].games
          statisticsForGames.audioCall = audioCall
          statisticsForGames.ourGame = ourGame
          statisticsForGames.savanahh = savannah
          statisticsForGames.sprint = sprint
        } else {
          const { audioCall, ourGame, savannah, sprint } = shortStatistic[i].games
          statisticsForGames.audioCall += audioCall
          statisticsForGames.ourGame += ourGame
          statisticsForGames.savanahh += savannah
          statisticsForGames.sprint += sprint
        }
      }

      setShortStatisticsForGames(statisticsForGames)

      const arr: Array<GetStatisticsType> = []
      for (let i = 0; i < statistic.length; i += 1) {
        if (i === 0) {
          arr.push(statistic[i])
        } else {
          const newStatistic: GetStatisticsType = {
            count: statistic[i].count + arr[i - 1].count,
            date: statistic[i].date,
          }
          arr.push(newStatistic)
        }
      }
      setStaticticsForSecontChart(arr)
    }
    // eslint-disable-next-line
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

  useEffect(() => {
    let isMounted = true
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
    if (winWidth < 640) {
      setFont('24px')
    } else {
      setFont('28px')
    }
    return () => {
      window.removeEventListener('resize', () => {
        isMounted = false
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="statistics">
      {userId ? (
        <>
          <Tabs defaultActiveKey="1" type="card" size="middle">
            <TabPane tab={intl.formatMessage({ id: 'Long_Statistics' })} key="1">
              {isEpmty ? (
                <h2>{intl.formatMessage({ id: 'not_words' })}</h2>
              ) : (
                <div className="statistics-container">
                  <ResponsiveContainer width={winWidth > 750 ? '45%' : '80%'} height={400}>
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
              <div className="statistics__words">
                {intl.formatMessage({ id: 'Statistics__words' })}:<h4>{countLearnedWordsPerDay}</h4>
              </div>
              <div className="statistics__procent">
                {intl.formatMessage({ id: 'Statistics__procent' })}:
                <h4>{procentRightWordsPerDay || 0}%</h4>
              </div>
              <div className="statistics__card_wrapper">
                <Card
                  className="statistics__card"
                  cover={<img className="statistics__img" alt="example" src={gameSavannah} />}
                >
                  <h4 className="card-statistics__title">
                    {intl.formatMessage({ id: 'savannah' })}
                  </h4>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">{shortStatisticsForGames?.savanahh}</span>
                  </p>
                </Card>
                <Card
                  className="statistics__card"
                  cover={<img className="statistics__img" alt="example" src={gameCall} />}
                >
                  <h4 className="card-statistics__title">
                    {intl.formatMessage({ id: 'audiocall' })}
                  </h4>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">{shortStatisticsForGames?.audioCall}</span>
                  </p>
                </Card>
                <Card
                  className="statistics__card"
                  cover={<img className="statistics__img" alt="example" src={gameSprint} />}
                >
                  <h4 className="card-statistics__title">{intl.formatMessage({ id: 'sprint' })}</h4>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">{shortStatisticsForGames?.sprint}</span>
                  </p>
                </Card>
                <Card
                  className="statistics__card"
                  cover={<img className="statistics__img" alt="example" src={gameOur} />}
                >
                  <h4 className="card-statistics__title">
                    {intl.formatMessage({ id: 'gameOur' })}
                  </h4>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">{shortStatisticsForGames?.ourGame}</span>
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
