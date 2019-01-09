import { getList, getMore } from '../../services/api'

export default {
  namespace: 'intangible_smriti',
  state: {
    title: [
      {
        title: '项目名录',
        listName: 'directorise',
        tag: 0,
        page: 0,
        category: 0
      },
      {
        title: '传承保护',
        listName: 'protect',
        tag: 1,
        page: 0,
        category: 0
      },
      {
        title: '非遗展馆',
        listName: 'hall',
        tag: 0,
        page: 0,
        category: 0
      },
      {
        title: '民俗活动',
        listName: 'activity',
        tag: 1,
        page: 0,
        category: 0
      },
      {
        title: '传承基地',
        listName: 'base',
        tag: 0,
        page: 0,
        category: 0
      },
      {
        title: '传承人',
        listName: 'person',
        tag: 1,
        page: 0,
        category: 0
      }
    ],
    focus: 0,
    page: 0,
    directorise: [],
    protect: [],
    hall: [],
    activity: [],
    base: [],
    person: [],
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
      const { title, focus } = yield select(state => state[`${payload.nameSpace}`])
      const requestPayload = title[focus]
      const { data, status } = yield getList(requestPayload)
      data.data.map((item) => {
        item.time = item.date.slice(0, 10)
      })
      if (status == 200 && data.data.length != 0) {
        yield put({
          type: 'Get',
          payload: [data.data, payload.index]
        })
      }
      return data
    },
    *change({ payload }, { put, select }) {
      const { title } = yield select(state => state[`${payload.name}`])
      const focus = title[payload.index]
      console.log(focus, 'change_focus')
      const  { data, status } = yield getList({
        category: focus.category,
        tag: focus.tag,
        page: focus.page
      })
      if (status == 200) {
        yield put({
          type: 'Change',
          payload: payload.index
        })
      }
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
      state.title[action.payload[1]].page += 1,
      state.focus = action.payload[1]
      return {
        ...state,
        articleList: state.articleList.concat(action.payload[0]),
      }
    }
  }
}