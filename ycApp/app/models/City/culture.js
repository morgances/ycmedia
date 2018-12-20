export default {
  namespace: 'city_culture',
  state: {
    title: [
      {
        title: '群文活动',
        listName: 'activity'
      },
      {
        title: '民间团队',
        listName: 'group'
      },
      {
        title: '公益培训',
        listName: 'training'
      }
    ],
    activity: [
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    group: [
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    focus: 0,
    show: [
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '2017/01/02',
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