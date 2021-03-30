import { WordType } from '../store/types/lesson'

import store from '../store'
import WordApi from '../services/WordApi'

export function getRandomFloat(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

/* eslint-disable */
function randomArr(inputArray: any[], outputLength: number) {
  function shuffle(a: any) {
    let j
    let x
    for (let i = a.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }
  const result = inputArray.filter((elem, index, array) => array.indexOf(elem) === index)
  return shuffle(result).slice(0, outputLength)
}

export default async function getWordsForGame(
  difficulty: number,
  countWords: number,
): Promise<Array<WordType>> {
  const state = store.getState()
  const randomPages: Array<number> = [1]
  let words: Array<WordType> = []

  const fromCurrentGroup = state.lessonReducer.fromCurrentGroup

  const countPage = countWords / 20

  if (fromCurrentGroup) {
    const currentGroup = state.lessonReducer.currentGroup || 1
    if (state.lessonReducer.currentPage > 25) {
      for (let i = state.lessonReducer.currentPage; i > countPage - 1; i -= 1) {
        const page = state.lessonReducer.currentPage - (i - 1)

        // eslint-disable-next-line no-await-in-loop
        const wordsFromResponse: Array<WordType> = await WordApi.getByGroupAndPage(
          currentGroup,
          page,
        )
        words = words.concat(wordsFromResponse)
      }
    } else {
      for (let i = 0; i < countPage - 1; i += 1) {
        const page = state.lessonReducer.currentPage + (i + 1)

        // eslint-disable-next-line no-await-in-loop
        const wordsFromResponse: Array<WordType> = await WordApi.getByGroupAndPage(
          currentGroup,
          page,
        )
        words = words.concat(wordsFromResponse)
      }
    }
    words = state.lessonReducer.words.concat(
      randomArr([...words], countWords - state.lessonReducer.words.length),
    )
    return words
  }

  for (let i = 0; i < countPage; i += 1) {
    let randomPage = 1

    while (randomPages.includes(randomPage)) {
      randomPage = getRandomFloat(0, 29)
    }
    randomPages.push(randomPage)
    // eslint-disable-next-line no-await-in-loop
    const wordsFromResponse: Array<WordType> = await WordApi.getByGroupAndPage(
      difficulty,
      randomPage,
    )
    words = words.concat(wordsFromResponse)
  }
  return randomArr(words, countWords)
}
