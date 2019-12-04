import { getText } from '../../services/api'

export default {
  namespace: 'detail',
  state: {
    article: {}
  },
  effects: {
    *getText({ payload }, { put }) {
      const { data } = yield getText({
        aid: payload.aid
      })
      if (data.status === 200) {
        data.data[0].time = data.data[0].date.slice(0, 10)
        yield put({
          type: 'Get',
          payload: data.data[0]
        })
      } else {
        return false
      }
      return data.data
    }
  },
  reducers: {
    Get(state, action) {
      return {
        ...state,
        article: { ...action.payload }
      }
    }
  }
}
