export default {
  namespace: 'book_resources',
  state: {
    culture: [
      {
        title: '数字资源',
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