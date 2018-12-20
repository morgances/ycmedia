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