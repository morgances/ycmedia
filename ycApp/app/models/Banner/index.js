import { getBanners } from '../../services/api'

export default {
  namespace: 'banner',
  state: {
    banners: []
  },
  effects: {
    *get({}, { put }) {
      const { data } = yield getBanners()
      yield put({
        type: 'Get',
        payload: data
      })
    }
  },
  reducers: {
    Get(state, action) {
      return {
        ...state,
        banners: [...action.payload.data],
      }
    }
  }
}