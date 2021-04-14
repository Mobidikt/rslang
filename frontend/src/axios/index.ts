/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios'
import { notification } from 'antd'
import store from '../store'
import actions from '../store/actions/auth'

axios.interceptors.request.use((request) => {
  const state = store.getState()
  const { token } = state.authReducer

  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    request.headers.common.Authorization = `Bearer ${token}`
  }

  return request
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const { status } = error.response

    const state = store.getState()

    if (status === 401 && state.authReducer.token) {
      store.dispatch(actions.logout())
      notification.warning({
        message: 'Session Expired',
        description:
          'Logout from the Administration Panel was successful. To log in to Administration Panel, click on the "Sign in" button.',
        duration: null,
        key: 'session-expired',
      })
    }
    return Promise.reject(error)
  },
)
