import axios from 'axios'
import config from '../config'
import { WordType } from '../store/types/lesson'

type GetByGroupAndPageResponseType = {
  data: Array<WordType>,
  status: number,
}

type GetByIdResponseType = {
  data: WordType,
  status: number,
}

const getByGroupAndPage = async (groupId: number, pageNumber: number) => {
  const data = await axios.get<GetByGroupAndPageResponseType>(
    `${config.API_URL}/words?group=${groupId}&page=${pageNumber}`,
  )
  return data
}

const getById = async (id: string) => {
  const data = await axios.get<GetByIdResponseType>(`${config.API_URL}/words/${id}`)
  return data
}

export default {
  getByGroupAndPage,
  getById,
}
