export default {
  namespace: 'intangible_smriti',
  state: {
    title: [
      {
        title: '项目名录',
        listName: 'directorise'
      },
      {
        title: '传承保护',
        listName: 'protect'
      },
      {
        title: '非遗展馆',
        listName: 'hall'
      },
      {
        title: '民俗活动',
        listName: 'activity'
      },
      {
        title: '传承基地',
        listName: 'base'
      },
      {
        title: '传承人',
        listName: 'person'
      }
    ],
    focus: 0,
    directorise: [
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
    protect: [
      {
        title: '传承保护',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    hall: [
      {
        title: '非遗展馆',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    activity: [
      {
        title: '民俗活动',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    base: [
      {
        title: '传承基地',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    person: [
      {
        title: '传承人',
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