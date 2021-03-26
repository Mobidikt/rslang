import React from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import './DictionaryCardList.scss'
import learnedWordsPhoto from '../../assets/image/learnWords.png'
import deletedWordsPhoto from '../../assets/image/delWords.png'
import difWordsPhoto from '../../assets/image/difWords.png'

const { Meta } = Card

const cards = [
  {
    src: learnedWordsPhoto,
    title: 'Studied words',
    path: '/dictionary/learned',
  },
  {
    src: difWordsPhoto,
    title: 'Difficult words',
    path: '/dictionary/difficult',
  },
  {
    src: deletedWordsPhoto,
    title: 'Deleted words',
    path: '/dictionary/deleted',
  },
]

const DictionaryCardList: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="dictionaryCardList">
      {cards.map((card) => (
        <Card
          className="dictionaryCardList__card"
          key={card.title}
          onClick={() => navigate(card.path)}
          cover={<img alt={card.title} src={card.src} />}
        >
          <Meta title={card.title} />
        </Card>
      ))}
    </div>
  )
}

export default DictionaryCardList
