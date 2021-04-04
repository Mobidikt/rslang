import React from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import './DictionaryCardList.scss'
import learnedWordsPhoto from '../../assets/image/learnWords.png'
import deletedWordsPhoto from '../../assets/image/delWords.png'
import difWordsPhoto from '../../assets/image/difWords.png'

const { Meta } = Card

const cards = [
  {
    src: learnedWordsPhoto,
    title: 'Studied_words',
    path: '/dictionary/learned',
  },
  {
    src: difWordsPhoto,
    title: 'Difficult_words',
    path: '/dictionary/difficult',
  },
  {
    src: deletedWordsPhoto,
    title: 'Deleted_words',
    path: '/dictionary/deleted',
  },
]

const DictionaryCardList: React.FC = () => {
  const intl = useIntl()
  const navigate = useNavigate()

  return (
    <div className="dictionaryCardList">
      {cards.map((card) => (
        <Card
          className="dictionaryCardList__card"
          key={card.title}
          onClick={() => navigate(card.path)}
          cover={<img alt={intl.formatMessage({ id: card.title })} src={card.src} />}
        >
          <Meta title={intl.formatMessage({ id: card.title })} />
        </Card>
      ))}
    </div>
  )
}

export default DictionaryCardList
