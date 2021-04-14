import axios, { AxiosResponse } from 'axios'
import config from '../config'
import { WordAgregationType } from '../store/types/dictionary'
import { WordType } from '../store/types/lesson'

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

const getByGroupAndPage: (groupId: number, pageNumber: number) => Promise<Array<WordType>> = async (
  groupId,
  pageNumber,
) => {
  const { data } = await axios.get<Array<WordType>>(
    `${config.API_URL}/words?group=${groupId}&page=${pageNumber}`,
  )
  return data
}

const getById: (id: string) => Promise<AxiosResponse<GetByIdResponseType>> = async (id) => {
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
  mode: 'difficult' | 'learned' | 'deleted',
  currentGame: 'sprint' | 'ourGame' | 'audioCall' | 'savannah' | '',
  isRight: boolean,
): Promise<SaveResponseType> => {
  const data = await axios.post<SaveResponseType>(
    `${config.API_URL}/users/${userId}/words/${wordId}`,
    {
      difficulty: mode,
      currentGame,
      isRight,
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

export type UpdateGamesCountAnswersType = {
  games: {
    savannah: number,
    sprint: number,
    audioCall: number,
    ourGame: number,
  },
}

const updateGamesCountAnswers = async (
  userId: string,
  wordId: string,
  currentGame: 'sprint' | 'ourGame' | 'audioCall' | 'savannah',
  isRight: boolean,
): Promise<UpdateGamesCountAnswersType> => {
  const { data } = await axios.patch<UpdateGamesCountAnswersType>(
    `${config.API_URL}/users/${userId}/words/${wordId}`,
    {
      currentGame,
      isRight,
    },
  )
  return data
}

const remove = async (userId: string, wordId: string) => {
  const data = await axios.delete(`${config.API_URL}/users/${userId}/words/${wordId}`)
  return data
}

export default {
  getByGroupAndPage,
  getById,
  save,
  update,
  getUserWords,
  remove,
  updateGamesCountAnswers,
}
