import React, { useState, useEffect, useCallback } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Title from '../../components/Games/Title/Title'
import './SavannaGamePage.scss'
import { GAMES_INFO } from '../../components/Games/utils/gamesInfo'
import getWordsForGame from '../../utils/getWordsForGame'
import SettingsGame from '../../components/Games/Settings/Settings'
import useTypedSelector from '../../hooks/useTypedSelector'
import { WordType } from '../../store/types/lesson'
import GameSavannah from '../../components/Games/GameSavannah/GameSavannah'
import FullScreenBtn from '../../components/Games/FullScreenBtn/FullScreenBtn'

const SavannaGame: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [words, setWords] = useState<Array<WordType>>([])
  const [fullScreen, setFullScreen] = useState(false)

  const getWords = useCallback(async () => {
    const wordsFromResponse = await getWordsForGame(level - 1, 25)
    setWords(wordsFromResponse)
  }, [level])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getWords()
  }, [getWords])

  const handleFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  useEffect(() => {
    if (fullScreen) {
      document.body.style.position = 'fixed'
    } else document.body.style.position = ''
  }, [fullScreen])

  return (
    <div className={`savanna-game ${fullScreen ? 'full-screen' : ''} `}>
      {isPlay ? (
        <GameSavannah onRestart={() => setIsPlay(false)} words={words} />
      ) : (
        <>
          <Title
            title={GAMES_INFO.savannah.title}
            description={GAMES_INFO.savannah.description}
            settings={GAMES_INFO.savannah.settings}
            startGame={() => setIsPlay(true)}
            loading={words.length === 0}
          />
        </>
      )}
      <FullScreenBtn fullScreen={fullScreen} toggle={handleFullScreen} />
    </div>
  )
}

export default SavannaGame
