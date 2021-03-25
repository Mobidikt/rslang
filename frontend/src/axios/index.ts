import axios from 'axios'
import store from '../store'

axios.interceptors.request.use((request) => {
  const state = store.getState()
  const { token } = state.authReducer

  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    request.headers.common.Authorization = `Bearer ${token}`
  }

  return request
})
