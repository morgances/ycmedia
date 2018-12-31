import { getList, getText, getMore } from '../../services/api'

export default {
  namespace: 'culture_news',
  state: {
    culture: [],
  },
  effects: {
    *refresh({ payload }, { put }) {
      const response = yield getMore({
        category: 2,
        tag: 3,
        date: '2018-12-01T15:43:46+08:00'
      })
      console.log(response, '======')
      // if (true) {
      //   yield put({
      //     type: 'Refresh',
      //     payload: [{
      //       title: '最新消息',
      //       time: '2017-01-02',
      //       image: require('../../assets/images/Main/news_one.png')
      //     }]
      //   })
      //   return {
      //     state: 2
      //   }
      // } else {
      //   return {
      //     state: 1
      //   }
      // }
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
      const { data } = yield getList(payload)
      const res = yield getText({aid: 7})
      console.log(data, '===')
      if (true) {
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
        culture: action.payload.concat(state.culture)
      }
    },
    LoadMore(state, action) {
      return {
        ...state,
        culture: state.culture.concat(action.payload)
      }
    },
    Get(state, action) {
      return {
        ...state,
        culture: action.payload
      }
    }
  }
}