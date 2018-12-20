export default {
  namespace: 'brand',
  state: {
    title: [
      {
        title: '公益性文化产品',
        listName: 'product'
      },
      {
        title: '公益性文化活动',
        listName: 'activity'
      },
      {
        title: '中华优秀传统文化与民族文化',
        listName: 'culture'
      }
    ],
    focus: 0,
    product: [
      {
        title: '宁夏中银视界文化艺术发展有限公司',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '宁夏艺盟礼益文化艺术品有限公司',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川禾浪文化创意科技有限公司',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川砚家班文化传媒有限公司',
        image: require('../../assets/images/Main/news_one.png'),
      }
    ],
    show: [
      {
        title: '宁夏中银视界文化艺术发展有限公司',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '宁夏艺盟礼益文化艺术品有限公司',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川禾浪文化创意科技有限公司',
        image: require('../../assets/images/Main/news_one.png'),
      },
      {
        title: '银川砚家班文化传媒有限公司',
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