export default {
    namespace: 'culture_news',
    state: {
      title: [
        {
          title: '名家',
          listName: 'people'
        },
        {
          title: '书法',
          listName: 'art'
        },
        {
          title: '版画',
          listName: 'art'
        },
        {
          title: '油画',
          listName: 'art'
        },
        {
          title: '摄影',
          listName: 'art'
        },
        {
          title: '其他',
          listName: 'art'
        },
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