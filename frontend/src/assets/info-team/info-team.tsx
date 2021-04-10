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
      'В процессе работы над проектом отвечал за: построение архитектуры приложения; разработка титульной страницы приложения; видео презентация приложения; разработка общего компонентов для игр "настроки игры" и "статистика игры"; разработка игры "Аудиовызов"; улучшение качества кода, рефакторинг кода',
    git: 'https://github.com/Mobidikt',
  },
  {
    name: 'Andrey Gavrilov',
    photo: 'https://i.pinimg.com/originals/54/c6/68/54c6680d3a14edf2c20c654b4970fbec.jpg',
    profession: 'Web-developer',
    info:
      'В процессе работы над проектом отвечал за: авторизация, серверная валидация данных; хранение на сервере и вывод данных  о краткосрочной и долгосрочной статистики; построение графиков долгосрочной статистики, разработка игры "Саванна"; разработка Учебника и Словаря',
    git: 'https://github.com/IKLOA',
  },
  {
    name: 'Anzhela Abitova',
    photo: AnzhelaPhoto,
    profession: 'Web-developer, Web-designer',
    info:
      'В процессе работы над проектом отвечала за: стилизацию приложения, разработка макетов в Figma; разработка игры "Наша игра"; разработка секции "О приложение"; доработка адаптива по всему приложению',
    git: 'https://github.com/anzhelaAbitova',
  },
  {
    name: 'Artsem Makarov',
    photo: ArtsemPhoto,
    profession: 'Web-developer',
    info:
      'В процессе работы над проектом отвечала за: страницу настроек; разработка общего компонента для игр "титульная страница игр"; разработка игры "Спринт"; разработка тестов; разработка секции "Видео".',
    git: 'https://github.com/ArtyomMakarov',
  },
]

export default infoTeam
