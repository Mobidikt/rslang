import axios from 'axios'
import config from '../config'

export type GetStatisticsType = {
  date: string,
  count: number,
}

const get = async (userId: string): Promise<Array<GetStatisticsType>> => {
  const { data } = await axios.get<Array<GetStatisticsType>>(
    `${config.API_URL}/users/${userId}/statistics`,
  )
  return data
}

export type GetForShortTermStatistics = {
  wordId: string,
  userId: string,
  isRight: boolean,
  userWordDate: string,
  games: {
    savannah: number,
    sprint: number,
    audioCall: number,
    ourGame: number,
  },
}

const getForShortTermStatistics = async (
  userId: string,
): Promise<Array<GetForShortTermStatistics>> => {
  const { data } = await axios.get<Array<GetForShortTermStatistics>>(
    `${config.API_URL}/users/${userId}/words/get/statistic`,
  )
  return data
}

type AddResponseType = {
  userId: string,
  learnedWord: number,
  statiscticDate: string,
}

const add = async (userId: string): Promise<AddResponseType> => {
  const { data } = await axios.post<AddResponseType>(`${config.API_URL}/users/${userId}/statistics`)
  return data
}

export default {
  get,
  add,
  getForShortTermStatistics,
}
