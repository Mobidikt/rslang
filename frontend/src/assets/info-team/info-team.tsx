import KirillPhoto from '../image/kirill.jpg'
import AnzhelaPhoto from '../image/anzhela.jpg'
import ArtsemPhoto from '../image/artsem.jpg'

const infoTeam: {
  name: string,
  photo: string,
  profession: string,
  info: string,
  git: string,
}[] = [
  {
    name: 'Krill Metsker',
    photo: KirillPhoto,
    profession: 'Teamlead, web-developer',
    info:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    git: 'https://github.com/Mobidikt',
  },
  {
    name: 'Andrey Gavrilov',
    photo: 'https://i.pinimg.com/originals/54/c6/68/54c6680d3a14edf2c20c654b4970fbec.jpg',
    profession: 'Web-developer',
    info:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    git: 'https://github.com/IKLOA',
  },
  {
    name: 'Anzhela Abitova',
    photo: AnzhelaPhoto,
    profession: 'Web-developer, Web-designer',
    info:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    git: 'https://github.com/anzhelaAbitova',
  },
  {
    name: 'Artsem Makarov',
    photo: ArtsemPhoto,
    profession: 'Web-developer',
    info:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    git: 'https://github.com/ArtyomMakarov',
  },
]

export default infoTeam
