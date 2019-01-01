import { getList, getText, getMore } from '../../services/api'
import { refresh_result } from '../../components/Refresh_result'

export default {
  namespace: 'culture_news',
  state: {
    articleList: [],
  },
  effects: {
    *refresh({ payload }, { put }) {
      const { data, status } = yield getMore({
        category: 0,
        tag: 0,
        date: '2018-12-01T15:43:46+08:00'
      })
      if (status == 200 && data.data.length > 0) {
        yield put({
          type: 'Refresh',
          payload: data.data
        })
      }
      return data.data
    },
    *loadMore({ payload }, { call, put }) {
      // const response = yield call(getList({ payload }))
      if (response) {
        yield put({
          type: 'LoadMore',
          payload: [{
            title: '过去的消息',
            time: '2017-01-02',
            image: require('../../assets/images/Main/news_one.png')
          },
          {
            title: '过去的消息',
            time: '2017-01-02',
            image: require('../../assets/images/Main/news_one.png')
          }]
        })
      }
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
    }
  },
  reducers: {
    Refresh(state, action) {
      return {
        ...state,
        articleList: action.payload.concat(state.articleList)
      }
    },
    LoadMore(state, action) {
      return {
        ...state,
        articleList: state.articleList.concat(action.payload)
      }
    },
    Get(state, action) {
      return {
        ...state,
        articleList: action.payload
      }
    }
  }
}