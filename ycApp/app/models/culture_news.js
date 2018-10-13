export default {
  namespace: 'culture_news',
  state: {
    title: [
      {
        title: '文化动态',
        listName: 'culture'
      },
      {
        title: '美术资讯',
        listName: 'art'
      }
    ],
    culture: [
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      }
    ],
    art: [
      {
        title: '银川市图书馆举办“庆元旦”少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市图书馆举办“庆元旦”少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市图书馆举办“庆元旦”少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市图书馆举办“庆元旦”少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市图书馆举办“庆元旦”少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      }
    ],
    focus: 0,
    show: [
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../assets/images/Main/news_one.png'),
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