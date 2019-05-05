import { Toast } from 'antd-mobile-rn';
import { getNews, getMore } from '../../services/api'

export default {
  namespace: 'home',
  state: {
    articleList: [],
    page: 1
  },
  effects: {
    *refresh({ payload }, { put, select }) {
      const { articleList } = yield select(state => state[`${payload.nameSpace}`])
      const { data, status } = yield getNews({
        page: 1,
      })
      if (status == 200 && data.data.length > 0 && data.data[0].aid !== articleList[0].aid) {
        yield put({
          type: 'Refresh',
          payload: data.data
        })
      } else if (status == 200 && data.data.length > 0 && data.data[0].aid === articleList[0].aid) {
        return 'noMore'
      } else {
        return false
      }
      return true
    },
    *get({ payload }, { put }) {
      console.log(payload)
      const { data, status } = yield getNews(payload)
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
      const { data, status } = yield getNews({
        page: page + 1
      })
      if (data.data.length == 0) {
        return 'noMore'
      }
      data.data.map((item) => {
        item.time = item.date.slice(0, 10)
      })
      if (data.status === 200 && data.data.length > 0 && status === 200) {
        yield put({
          type: 'LoadMore',
          payload: {
            data: data.data
          }
        })
        return false
      } else {
        Toast.fail('刷新失败', 1)
        return false
      }
    }
  },
  reducers: {
    Refresh(state, action) {
      return {
        ...state,
        page: 1,
        articleList: [...action.payload]
      }
    },
    Get(state, action) {
      return {
        ...state,
        articleList: [...action.payload],
      }
    },
    LoadMore(state, action) {
      console.log(action, 'action')
      return {
        ...state,
        page: state.page + 1,
        articleList: state.articleList.concat([...action.payload.data])
      }
    }
  }
}