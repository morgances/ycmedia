export default {
  namespace: 'art_display',
  state: {
    title: [
      {
        title: '绘画',
        listName: 'painting'
      },
      {
        title: '书法',
        listName: 'calligraphy'
      },
      {
        title: '音乐',
        listName: 'music'
      },
      {
        title: '展览',
        listName: 'exhibition'
      }
    ],
    focus: 0,
    exhibition: [
      {
        title: '彩色高原摄影',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '水墨山水摄影',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '雪山远景摄影集',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '设计博物馆',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    calligraphy: [
      {
        title: '书法',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    music: [
      {
        title: '音乐',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    painting: [
      {
        title: '绘画',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    show: [
      {
        title: '绘画',
        time: '2017-01-02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ]
  },
  reducers: {
    Change(state, action) {
      return {
        ...state,
        focus: action.payload,
        show: [...state[state.title[index].listName]]
      }
    },
    Refresh(state, action) {
      return {
        ...state,
        culture: action.payload.concat(state.culture)
      }
    }
  },
  effects: {
    *refresh({ payload }, { call, put }) {
      const response = yield call()
      if (true) {
        yield put({
          type: 'Refresh',
          payload: [{
            title: '最新消息',
            time: '2017-01-02',
            image: require('../../assets/images/Main/news_one.png')
          }]
        })
      }
    },
    *change({ payload }, { call, put }) {
      // const response = yield call()
      if (true) {
        yield put({
          type: 'Change',
          payload
        })
      }
    }
  }
}