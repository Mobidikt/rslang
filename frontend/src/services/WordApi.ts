import axios from 'axios'
import config from '../config'
import { WordType } from '../store/types/lesson'

type GetByGroupAndPageResponseType = {
  data: Array<WordType>,
  status: number,
}

const getByGroupAndPage = async (groupId: number, pageNumber: number) => {
  const data = await axios.get<GetByGroupAndPageResponseType>(
    `${config.API_URL}/words?group=${groupId}&page=${pageNumber}`,
  )
  return data
}

export default {
  getByGroupAndPage,
}
