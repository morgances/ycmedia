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
    focus: 3,
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
    show: [
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
    ]
  },
  reducers: {
    change(state, { payload: index }) {
      state.focus = index
      state.show = [...state[state.title[index].listName]]
      return {
        ...state
      }
    }
  }
}