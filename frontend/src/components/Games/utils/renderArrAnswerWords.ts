import { WordType } from '../../../store/types/lesson'

const renderArrAnswerWords: (
  gameWords: WordType[],
  arrGameWord: WordType[],
  index: number,
) => WordType[] = (gameWords, arrGameWord, index) => {
  const wordsAnswer: WordType[] = []
  wordsAnswer.push(gameWords[index])
  wordsAnswer.push(arrGameWord[index * 4])
  wordsAnswer.push(arrGameWord[index * 4 + 1])
  wordsAnswer.push(arrGameWord[index * 4 + 2])
  wordsAnswer.push(arrGameWord[index * 4 + 3])
  return wordsAnswer
}
export default renderArrAnswerWords
