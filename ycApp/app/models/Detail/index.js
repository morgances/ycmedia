import { getText } from '../../services/api'

export default {
  namespace: 'detail',
  state: {
    article: {
      title: '银川市图书馆举办“庆元旦”少儿活动',
      time: '2018-12-31',
      author: '技术猫',
      content: '这个是很正经的内容的内容的内容的内容'
    }
  },
  effects: {
    *getText({ payload }, { put }) {
      const { data, status } = yield getText({
        aid: 1
      })
      if (status == 200 && data.data.length > 0) {
        yield put({
          type: 'Get',
          payload: data.data
        })
      }
      return data.data
    }
  },
  reducers: {
    Get(state, action) {
      return {
        ...state,
        articleList: state.articleList.concat(action.payload),
        page: state.page + 1
      }
    }
  }
}