export default {
  namespace: 'culture_free',
  state: {
    culture: [
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
  },
  effects: {
    *refresh({ payload }, { call, put }) {
      // const response = yield call()
      if (true) {
        yield put({
          type: 'Refresh',
          payload: [{
            title: '最新消息',
            time: '2017-01-02',
            image: require('../../assets/images/Main/news_one.png')
          }]
        })
        return {
          state: 2
        }
      } else {
        return {
          state: 1
        }
      }
    },
    *loadMore({ payload }, { call, put }) {
      // const response = yield call()
      if (true) {
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
    *get({ payload }, { call, put }) {
      // const response = yield call()
      // if (true) {
      //   yield put({
      //     type: 'Get',
      //     payload: Response.data
      //   })
      // }
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