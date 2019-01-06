import { getList, getMore } from '../../services/api'

export default {
  namespace: 'book_books',
  state: {
    articleList: [],
    page: 0
  },
  effects: {
    *refresh({ payload }, { put }) {
      const { data, status } = yield getMore({
        category: 0,
        tag: 0,
        date: state.articleList[0].date
      })
      if (status == 200 && data.data.length > 0) {
        yield put({
          type: 'Refresh',
          payload: data.data
        })
      }
      return data.data
    },
    *get({ payload }, { put }) {
      payload.page = state.page
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