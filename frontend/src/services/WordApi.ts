import axios from 'axios'
import config from '../config'
import { WordAgregationType } from '../store/types/dictionary'
import { WordType } from '../store/types/lesson'

type GetByGroupAndPageResponseType = {
  data: Array<WordType>,
  status: number,
}

type GetByIdResponseType = {
  data: WordType,
  status: number,
}

export type SaveResponseType = {
  id: string,
  difficulty: string,
  wordId: string,
}

type UpdateResponseType = {
  id: string,
  difficulty: string,
  wordId: string,
}

interface GetUserWordResponse {
  paginatedResults: Array<WordAgregationType>;
}

const getByGroupAndPage = async (groupId: number, pageNumber: number) => {
  const data = await axios.get<GetByGroupAndPageResponseType>(
    `${config.API_URL}/words?group=${groupId}&page=${pageNumber}`,
  )
  return data
}

const getByGroup = async (groupId: number) => {
  const data = await axios.get<GetByGroupAndPageResponseType>(
    `${config.API_URL}/words?group=${groupId}`,
  )
  return data
}

const getById = async (id: string) => {
  const data = await axios.get<GetByIdResponseType>(`${config.API_URL}/words/${id}`)
  return data
}

async function getUserWords(userId: string): Promise<WordAgregationType[]> {
  const { data } = await axios.get<GetUserWordResponse[]>(
    `${config.API_URL}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord":{"$exists": true}}`,
  )
  return data[0].paginatedResults
}

const save = async (
  userId: string,
  wordId: string,
  mode: 'difficult' | 'learned',
): Promise<SaveResponseType> => {
  const data = await axios.post<SaveResponseType>(
    `${config.API_URL}/users/${userId}/words/${wordId}`,
    {
      difficulty: mode,
    },
  )
  return data.data
}

const update = async (
  userId: string,
  wordId: string,
  difficulty: 'learned' | 'difficult' | 'deleted',
): Promise<UpdateResponseType> => {
  const { data } = await axios.put<UpdateResponseType>(
    `${config.API_URL}/users/${userId}/words/${wordId}`,
    {
      difficulty,
    },
  )
  return data
}

export default {
  getByGroupAndPage,
  getByGroup,
  getById,
  save,
  update,
  getUserWords,
}
