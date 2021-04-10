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

  const getStatistics = useCallback(async () => {
    if (userId) {
      const statistic = await StatisticsApi.get(userId)
      const shortStatistic: Array<GetForShortTermStatistics> = await StatisticsApi.getForShortTermStatistics(
        userId,
      )
      setCountLearnedWordsPerDay(shortStatistic.length)
      const rightAnswers = shortStatistic.filter((el) => el.isRight === true)
      const percent = (rightAnswers.length / shortStatistic.length) * 100
      setProcentRightWordsPerDay(percent)
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
              <div className="statistics__words">
                {intl.formatMessage({ id: 'Statistics__words' })}:<h4>{countLearnedWordsPerDay}</h4>
              </div>
              <div className="statistics__procent">
                {intl.formatMessage({ id: 'Statistics__procent' })}:
                <h4>{procentRightWordsPerDay}%</h4>
              </div>
              <div className="statistics__card_wrapper">
                <Card
                  className="statistics__card"
                  cover={
                    <img
                      className="statistics__img"
                      alt="example"
                      src="https://cdn.hipwallpaper.com/i/30/95/ZhbyOs.jpg"
                    />
                  }
                >
                  <h4>{intl.formatMessage({ id: 'savannah' })}</h4>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">{shortStatisticsForGames?.savanahh}</span>
                  </p>
                </Card>
                <Card
                  className="statistics__card"
                  cover={
                    <img
                      className="statistics__img"
                      alt="example"
                      src="https://million-wallpapers.ru/wallpapers/3/14/10313123744109410199/music-naushniki-by-dr-dre-pleer-muzyka-brand-beats-i.jpg"
                    />
                  }
                >
                  <h4>{intl.formatMessage({ id: 'audiocall' })}</h4>
                  {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                  <span className="text__big">{shortStatisticsForGames?.audioCall}</span>
                </Card>
                <Card
                  className="statistics__card"
                  cover={
                    <img
                      className="statistics__img"
                      alt="example"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Men_100_m_French_Athletics_Championships_2013_t154126.jpg/1200px-Men_100_m_French_Athletics_Championships_2013_t154126.jpg"
                    />
                  }
                >
                  <h4>{intl.formatMessage({ id: 'sprint' })}</h4>
                  <p>
                    {intl.formatMessage({ id: 'Statistics__right_words' })}{' '}
                    <span className="text__big">{shortStatisticsForGames?.sprint}</span>
                  </p>
                </Card>
                <Card
                  className="statistics__card"
                  cover={
                    <img
                      className="statistics__img"
                      alt="example"
                      src="https://www.regalraum.com/media/catalog/category-imagewall-EN/shelves/free-standing-shelves/bookshelf/white-bookcase/booksheves-white-showcase-bookshelves-white-metal.jpg"
                    />
                  }
                >
                  <h4>{intl.formatMessage({ id: 'gameOur' })}</h4>
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
