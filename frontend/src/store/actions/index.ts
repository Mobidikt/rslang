import lessonActions from './lesson'
import authActions from './auth'
import appActions from './app'
import dictionaryActions from './dictionary'
import gameSettings from './game'
import { setLanguage } from './language'

export default {
  ...lessonActions,
  ...authActions,
  ...appActions,
  ...dictionaryActions,
  ...gameSettings,
  setLanguage,
}
