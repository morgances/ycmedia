import { getList, getMore } from '../../services/api'

export default {
  namespace: 'intangible_culture',
  state: {
    title: [
      {
        title: '文化遗址',
        listName: 'culture',
        tag: 0,
        page: 0,
        category: 0
      },
      {
        title: '文物鉴赏',
        listName: 'relics',
        tag: 0,
        page: 0,
        category: 0
      },
      {
        title: '文物保护',
        listName: 'portect',
        tag: 0,
        page: 0,
        category: 0
      }
    ],
    focus: 0,
    culture: [],
    relics: [],
    portect: [],
    articleList: []
  },
  effects: {
    *refresh({ payload }, { put, select }) {
      const { articleList } = yield select(state => state[`${payload.nameSpace}`])
      const { data, status } = yield getMore({
        category: articleList[0].category,
        tag: articleList[0].tag,
        date: articleList[0].date
      })
      if (status == 200 && data.data.length > 0) {
        yield put({
          type: 'Refresh',
          payload: data.data
        })
      }
      return data.data
    },
    *get({ payload }, { put, select }) {
      const { title } = yield select(state => state[`${payload.nameSpace}`])
      const requestPayload = title[payload.index]
      const { data, status } = yield getList(requestPayload)
      data.data.map((item) => {
        item.time = item.date.slice(0, 10)
      })
      console.log(data, 'culture_data')
      if (status == 200) {
        yield put({
          type: 'Get',
          payload: [data.data, payload.index]
        })
      }
      return data
    },
    *change({ payload }, { put, select }) {
      const { title } = yield select(state => state[`${payload.name}`])
      console.log(title, 'title')
      const focus = title[payload.index]
      console.log(focus)
      const  { data, status } = yield getList({
        category: focus.category,
        tag: focus.tag,
        page: focus.page
      })
    }
  },
  reducers: {
    Change(state, { payload: index }) {
      state.focus = index
      state.articleList = [...state[state.title[index].listName]]
      return {
        ...state
      }
    },
    Refresh(state, action) {
      return {
        ...state,
        articleList: action.payload.concat(state.articleList)
      }
    },
    Get(state, action) {
      state.title[action.payload[1]].page += 1
      return {
        ...state,
        articleList: state.articleList.concat(action.payload[0]),
      }
    }
  }
}