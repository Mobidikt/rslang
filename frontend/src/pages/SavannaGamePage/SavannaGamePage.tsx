import React, { useState, useEffect, useCallback } from 'react'
import Title from '../../components/Games/Title/Title'
import './SavannaGamePage.scss'
import { GAMES_INFO } from '../../components/Games/utils/gamesInfo'
import getWordsForGame from '../../utils/getWordsForGame'
import SettingsGame from '../../components/Games/Settings/Settings'
import useTypedSelector from '../../hooks/useTypedSelector'
import { WordType } from '../../store/types/lesson'
import GameSavannah from '../../components/Games/GameSavannah/GameSavannah'

const SavannaGame: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [words, setWords] = useState<Array<WordType>>([])

  const getWords = useCallback(async () => {
    const wordsFromResponse = await getWordsForGame(level - 1, 25)
    setWords(wordsFromResponse)
  }, [level])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getWords()
  }, [getWords])

  return (
    <div className="savanna-game">
      {isPlay ? (
        <GameSavannah words={words} />
      ) : (
        <>
          <Title
            title={GAMES_INFO.savannah.title}
            description={GAMES_INFO.savannah.description}
            settings={GAMES_INFO.savannah.settings}
            startGame={() => setIsPlay(true)}
            loading={words.length === 0}
          />
          <SettingsGame />
        </>
      )}
    </div>
  )
}

export default SavannaGame
