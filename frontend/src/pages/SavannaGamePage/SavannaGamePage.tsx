import React, { useState, useEffect, useCallback } from 'react'
import Title from '../../components/Games/Title/Title'
import './SavannaGamePage.scss'
import { GAMES_INFO } from '../../components/Games/utils/gamesInfo'
import getWordsForGame from '../../utils/getWordsForGame'
import useTypedSelector from '../../hooks/useTypedSelector'
import { WordType } from '../../store/types/lesson'
import GameSavannah from '../../components/Games/GameSavannah/GameSavannah'
import FullScreenBtn from '../../components/Games/FullScreenBtn/FullScreenBtn'

const SavannaGame: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [words, setWords] = useState<Array<WordType>>([])
  const [fullScreen, setFullScreen] = useState(false)
  const [backgroundY, setBackgroundY] = useState<number>(-1500)
  const getWords = useCallback(async () => {
    const wordsFromResponse = await getWordsForGame(level - 1, 25)
    setWords(wordsFromResponse)
    setBackgroundY(-1500)
  }, [level])

  const calcBackgroundY = (count: number) => {
    setBackgroundY((prev) => prev + count * 10)
  }
  useEffect(() => {
    if (!isPlay) setBackgroundY(-1500)
  }, [isPlay])
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getWords()
  }, [getWords])

  return (
    <div
      className={`savanna-game ${fullScreen ? 'full-screen' : ''} `}
      style={{ backgroundPositionY: backgroundY }}
    >
      {isPlay ? (
        <GameSavannah
          onRestart={() => setIsPlay(false)}
          words={words}
          calcBackgroundY={calcBackgroundY}
        />
      ) : (
        <Title
          title={GAMES_INFO.savannah.title}
          description={GAMES_INFO.savannah.description}
          settings={GAMES_INFO.savannah.settings}
          startGame={() => setIsPlay(true)}
          loading={words.length === 0}
        />
      )}
      <FullScreenBtn fullScreen={fullScreen} setFullScreen={setFullScreen} />
    </div>
  )
}

export default SavannaGame
