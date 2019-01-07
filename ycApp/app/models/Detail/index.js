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
      data.data[0].time = data.data[0].date.slice(0, 10)
      if (data.status == 200 && data.data.length > 0) {
        yield put({
          type: 'Get',
          payload: data.data[0]
        })
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
