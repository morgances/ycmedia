export default {
  namespace: 'intangible_culture',
  state: {
    title: [
      {
        title: '文化遗址',
        listName: 'culture'
      },
      {
        title: '文物鉴赏',
        listName: 'relics'
      },
      {
        title: '文物保护',
        listName: 'portect'
      }
    ],
    focus: 0,
    culture: [
      {
        title: '青山拦不住、岩画书千秋',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '在银川南城墙远眺西塔',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '二十世纪五十年代，工人们在银川西门东侧修筑',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1959 年宁夏回族自治区人民委员会大门',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1985 自治区成立之时的银川市貌',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    relics: [
      {
        title: '文物鉴赏',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '在银川南城墙远眺西塔',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '二十世纪五十年代，工人们在银川西门东侧修筑',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1959 年宁夏回族自治区人民委员会大门',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1985 自治区成立之时的银川市貌',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    portect: [
      {
        title: '文化保护',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '在银川南城墙远眺西塔',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '二十世纪五十年代，工人们在银川西门东侧修筑',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1959 年宁夏回族自治区人民委员会大门',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1985 自治区成立之时的银川市貌',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    show: [
      {
        title: '青山拦不住、岩画书千秋',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '在银川南城墙远眺西塔',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '二十世纪五十年代，工人们在银川西门东侧修筑',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1959 年宁夏回族自治区人民委员会大门',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '1985 自治区成立之时的银川市貌',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ]
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
    Change(state, { payload: index }) {
      state.focus = index
      state.show = [...state[state.title[index].listName]]
      return {
        ...state
      }
    },
    Refresh(state, action) {
      return {
        ...state,
        show: action.payload.concat(state.show)
      }
    },
    LoadMore(state, action) {
      return {
        ...state,
        show: state.show.concat(action.payload)
      }
    },
    Get(state, action) {
      return {
        ...state,
        show: action.payload
      }
    }
  }
}