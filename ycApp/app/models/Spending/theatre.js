export default {
  namespace: 'spending_theatre',
  state: {
    title: [
      {
        title: '院团介绍',
        listName: 'troupes'
      },
      {
        title: '剧目介绍',
        listName: 'play'
      },
      {
        title: '商业演出',
        listName: 'performance'
      }
    ],
    focus: 0,
    troupes: [
      {
        title: '银川奥斯卡影城',
        instruction: '宁夏贺兰山苏峪口国家森林公园位于贺兰山国家级自然保护区内，阿啦啦啦',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '天一国际影城',
        instruction: '水沟洞是中国最早发掘的旧石器时代文化遗址',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '宁夏人民会堂国际影城',
        instruction: '隶属于宁夏人民会堂管理中心，于 2011 年 5 月 1 日正式营业，是“第十”',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '东城影院',
        instruction: '是国内西北地区首创同步影厅和视听馆相结合的特色影院',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '黄沙古渡游玩指南',
        instruction: '黄沙古渡原生态旅游景区是...',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    play: [
      {
        title: '剧目介绍',
        instruction: '黄沙古渡原生态旅游景区是...',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    performance: [
      {
        title: '商业演出',
        instruction: '黄沙古渡原生态旅游景区是...',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    show: [
      {
        title: '银川奥斯卡影城',
        instruction: '宁夏贺兰山苏峪口国家森林公园位于贺兰山国家级自然保护区内，阿啦啦啦',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '天一国际影城',
        instruction: '水沟洞是中国最早发掘的旧石器时代文化遗址',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '宁夏人民会堂国际影城',
        instruction: '隶属于宁夏人民会堂管理中心，于 2011 年 5 月 1 日正式营业，是“第十”',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '东城影院',
        instruction: '是国内西北地区首创同步影厅和视听馆相结合的特色影院',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '黄沙古渡游玩指南',
        instruction: '黄沙古渡原生态旅游景区是...',
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