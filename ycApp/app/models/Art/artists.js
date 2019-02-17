import { getList, getMore } from '../../services/api'

export default {
  namespace: 'art_artists',
  state: {
    articleList: [],
    page: 0
  },
  effects: {
    *refresh({ payload }, { put, select }) {
      const { articleList } = yield select(state => state[`${payload.nameSpace}`])
      const { data, status } = yield getMore({
        category: 0,
        tag: 0,
        date: articleList[0].date,
        lable: 0
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
      return data.data
    },
    *loadMore({ payload }, { put, select }) {
      const { page } = yield select(state => state[`${payload.nameSpace}`])
      const { data, status } = yield getList({
        category: payload.category,
        tag: payload.category,
        page: page + 1
      })
      if (status == 200 && data.data.length != 0) {
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