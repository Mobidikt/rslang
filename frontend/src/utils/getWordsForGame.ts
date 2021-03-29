import { WordType } from '../store/types/lesson'

import store from '../store'
import WordApi from '../services/WordApi'

function getRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min
}

/* eslint-disable */
export function randomArr(inputArray: any[], outputLength: number) {
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
  difficulty: 0 | 1 | 2 | 3 | 4 | 5,
  countWords: number,
): Promise<Array<WordType>> {
  const state = store.getState()
  const randomPages: Array<number> = [1]
  let words: Array<WordType> = []

  const fromCurrentGroup = state.lessonReducer.fromCurrentGroup

  const countPage = countWords / 20

  if (fromCurrentGroup) {
    const currentGroup = state.lessonReducer.currentGroup || 1
    for (let i = 0; i < countPage - 1; i += 1) {
      const page = state.lessonReducer.currentPage + (i + 1)

      // eslint-disable-next-line no-await-in-loop
      const wordsFromResponse: Array<WordType> = await WordApi.getByGroupAndPage(currentGroup, page)
      words = [...words].concat(wordsFromResponse)
    }
    words = randomArr([state.lessonReducer.words, ...words], countWords)
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
    words = [...words].concat(wordsFromResponse)
  }
  return randomArr(words, countWords)
}
