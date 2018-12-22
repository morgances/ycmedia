export default {
  namespace: 'art_artists',
  state: {
    show: [
      {
        title: '名家介绍',
        instruction: '宁夏贺兰山苏峪口国家森林公园位于贺兰山国家级自然保护区内，阿啦啦啦',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '时空隧道——水洞沟',
        instruction: '水沟洞是中国最早发掘的旧石器时代文化遗址',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '灵武高庙',
        instruction: '灵武高庙又称上帝庙，其前身为“玄武观”',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '月牙湖',
        instruction: '公元前33年，昭君出塞和亲，行至黄河渡口处',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '黄沙古渡游玩指南',
        instruction: '黄沙古渡原生态旅游景区是...',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ]
  },
  effects: {
    *refresh({ payload }, { call, put }) {
      const response = yield call()
      if (response.state)
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
  reducers: {
    Refresh(state, action) {
      return {
        ...state,
        culture: action.payload.concat(state.culture)
      }
    }
  }
}