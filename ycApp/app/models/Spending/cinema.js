import { getList, getMore } from '../../services/api'

export default {
  namespace: 'spending_cinema',
  state: {
    articleList: [],
    page: 1
  },
  effects: {
    *refresh({ payload }, { put, select }) {
      const { articleList } = yield select(state => state[`${payload.nameSpace}`])
      if (articleList.length === 0) {
        return 'noMore'
      }
      const { data, status } = yield getMore({
        category: '文化消费',
        tag: '银川影院',
        date: articleList[0].date
      })
      if (status == 200 && data.data.length > 0) {
        yield put({
          type: 'Refresh',
          payload: data.data
        })
        return true
      } else if (data.status === 200 && data.data.length === 0 && status === 200) {
        return 'noMore'
      }
      return false
    },
    *get({ payload }, { put }) {
      const { data, status } = yield getList(payload)
      data.data.map((item) => {
        item.time = item.date.slice(0, 10)
      })
      if (status === 200 && data.status === 200) {
        yield put({
          type: 'Get',
          payload: data.data
        })
        return true
      }
      return false
    },
    *loadMore({ payload }, { put, select }) {
      const { page } = yield select(state => state[`${payload.nameSpace}`])
      const { data, status } = yield getList({
        category: payload.category,
        tag: payload.tag,
        page: page + 1
      })
      if (status === 200 && data.data.length > 0 && data.status === 200) {
        yield put({
          type: 'LoadMore',
          payload: {
            data: data.data
          }
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
        articleList: [...action.payload],
      }
    },
    LoadMore(state, action) {
      return {
        ...state,
        page: state.page + 1,
        articleList: state.articleList.concat(action.payload)
      }
    }
  }
}