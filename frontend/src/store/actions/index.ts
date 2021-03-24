import lessonActions from './lesson'
import authActions from './auth'
import appActions from './app'

export default {
  ...lessonActions,
  ...authActions,
  ...appActions,
}
