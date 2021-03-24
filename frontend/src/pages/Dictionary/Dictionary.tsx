import React from 'react'
import { Card } from 'antd'
import './Dictionary.scss'

import learnedWordsPhoto from '../../assets/image/learnWords.png'
import deletedWordsPhoto from '../../assets/image/delWords.png'
import difWordsPhoto from '../../assets/image/difWords.png'

const { Meta } = Card

const Dictionary: React.FC = () => {
  return (
    <div className="dictionary">
      <Card className="dictionary__card" cover={<img alt="example" src={learnedWordsPhoto} />}>
        <Meta title="Studied words" />
      </Card>
      <Card className="dictionary__card" cover={<img alt="example" src={difWordsPhoto} />}>
        <Meta title="Studied words" />
      </Card>
      <Card className="dictionary__card" cover={<img alt="example" src={deletedWordsPhoto} />}>
        <Meta title="Studied words" />
      </Card>
    </div>
  )
}

export default Dictionary
