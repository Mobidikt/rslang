import KirillPhoto from '../image/kirill.jpg'
import AnzhelaPhoto from '../image/anzhela.jpg'
import ArtsemPhoto from '../image/artsem.jpg'
import AndreyPhoto from '../image/andrey.jpg'

const infoTeam: {
  name: string,
  photo: string,
  profession: string,
  info: string,
  git: string,
}[] = [
  {
    name: 'kirill_name',
    photo: KirillPhoto,
    profession: 'Teamlead_Web_developer',
    info: 'info_kirill',
    git: 'https://github.com/Mobidikt',
  },
  {
    name: 'andrey_name',
    photo: AndreyPhoto,
    profession: 'Web_developer',
    info: 'info_andrey',
    git: 'https://github.com/IKLOA',
  },
  {
    name: 'anzhela_name',
    photo: AnzhelaPhoto,
    profession: 'Web_developer_Web_designer',
    info: 'info_anzhela',
    git: 'https://github.com/anzhelaAbitova',
  },
  {
    name: 'artsem_name',
    photo: ArtsemPhoto,
    profession: 'Web_developer',
    info: 'info_artsem',
    git: 'https://github.com/ArtyomMakarov',
  },
]

export default infoTeam
