import { getList, getMore } from '../../services/api'

export default {
  namespace: 'culture_inform',
  state: {
    articleList: [],
    page: 0
  },
  effects: {
    *refresh({ payload }, { put, select }) {
      const { articleList } = yield select(state => state[`${payload.nameSpace}`])
      const { data, status } = yield getMore({
        category: 1,
        tag: 1,
        date: articleList[0].date
      })
      if (status == 200 && data.data.length > 0) {
        yield put({
          type: 'Refresh',
          payload: data.data
        })
      }
      return data.data
    },
    *get({ payload }, { put, select }) {
      const { page } = yield select(state => state[`${payload.nameSpace}`])
      payload.page = page
      const { data, status } = yield getList(payload)
      data.data.map((item) => {
        item.time = item.date.slice(0, 10)
      })
      if (status == 200) {
        yield put({
          type: 'Get',
          payload: data.data
        })
      }
      return data
    }
  },
  reducers: {
    Refresh(state, action) {
      return {
        ...state,
        articleList: action.payload.concat(state.articleList)
      }
    },
    Get(state, action) {
      return {
        ...state,
        articleList: state.articleList.concat(action.payload),
        page: state.page + 1
      }
    }
  }
}