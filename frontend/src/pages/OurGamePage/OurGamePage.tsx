import React, { useState, useEffect, useCallback } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Title from '../../components/Games/Title/Title'
import './OurGamePage.scss'
import { GAMES_INFO } from '../../components/Games/utils/gamesInfo'
import getWordsForGame from '../../utils/getWordsForGame'
import SettingsGame from '../../components/Games/Settings/Settings'
import useTypedSelector from '../../hooks/useTypedSelector'
import { WordType } from '../../store/types/lesson'
import OurGame from '../../components/Games/OurGame/OurGame'
import FullScreenBtn from '../../components/Games/FullScreenBtn/FullScreenBtn'

const GameOur: React.FC = () => {
  const { level } = useTypedSelector((state) => state.gameReducer)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [words, setWords] = useState<Array<WordType>>([])

  const handleFullScreen = useFullScreenHandle()

  const getWords = useCallback(async () => {
    const wordsFromResponse = await getWordsForGame(level - 1, 25)
    setWords(wordsFromResponse)
  }, [level])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getWords()
  }, [getWords])

  return (
    <div className="ourgame-game">
      {isPlay ? (
        <OurGame />
      ) : (
        <>
          <Title
            // eslint-disable-next-line
            title={GAMES_INFO.ourgame.title}
            // eslint-disable-next-line
            description={GAMES_INFO.ourgame.description}
            settings={GAMES_INFO.ourgame.settings}
            startGame={() => setIsPlay(true)}
            loading={words.length === 0}
          />
        </>
      )}
    </div>
  )
}

export default GameOur
