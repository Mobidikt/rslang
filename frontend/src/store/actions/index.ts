import lessonActions from './lesson'
import authActions from './auth'
import appActions from './app'
import dictionaryActions from './dictionary'

export default {
  ...lessonActions,
  ...authActions,
  ...appActions,
  ...dictionaryActions,
}
