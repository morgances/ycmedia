import { getList, getMore } from '../../services/api'

export default {
  namespace: 'art_display',
  state: {
    title: [
      {
        title: '绘画',
        listName: 'painting',
        tag: '艺术展示',
        page: 1,
        category: '艺术空间',
        isLoad: 0,
        label: '绘画'
      },
      {
        title: '书法',
        listName: 'calligraphy',
        tag: '艺术展示',
        page: 1,
        category: '艺术空间',
        isLoad: 0,
        label: '书法'
      },
      {
        title: '音乐',
        listName: 'music',
        tag: '艺术展示',
        page: 1,
        category: '艺术空间',
        isLoad: 0,
        label: '音乐'
      },
      {
        title: '展览',
        listName: 'exhibition',
        tag: '艺术展示',
        page: 1,
        category: '艺术空间',
        isLoad: 0,
        label: '展览'
      }
    ],
    focus: 0,
    page: 0,
    exhibition: [],
    calligraphy: [],
    music: [],
    painting: [],
    articleList: []
  },
  effects: {
    *refresh({ payload }, { put, select }) { // 下拉刷新
      const { articleList, focus } = yield select(state => state[`${payload.nameSpace}`])
      if (articleList.length === 0) {
        return 'noMore'
      }
      const { data, status } = yield getMore({
        category: articleList[0].category,
        tag: articleList[0].tag,
        date: articleList[0].date
      })
      if (status == 200 && data.data.length > 0) {
        yield put({
          type: 'Refresh',
          payload: {
            data: data.data,
            focus
          }
        })
        return true
      } else if (status === 200 && data.data.length == 0) {
        return 'noMore'
      } else {
        return false
      }
    },
    *get({ payload }, { put, select }) { // 获取数据
      const { title, focus } = yield select(state => state[`${payload.nameSpace}`])
      const requestPayload = title[focus]
      const { data, status } = yield getList({
        category: requestPayload.category,
        page: 1,
        tag: requestPayload.tag,
        label: requestPayload.label
      })
      data.data.map((item) => {
        item.time = item.date.slice(0, 10)
      })
      if (status === 200 && data.status === 200 && data.data.length > 0) {
        yield put({
          type: 'Get',
          payload: {
            data: data.data,
            focus
          }
        })
      }
      return {
        focusModel: title[focus]
      }
    },
    *change({ payload }, { put, select }) { // 切换子版块
      const { title } = yield select(state => state[`${payload.name}`])
      const focus = title[payload.index]
      const focusList = yield select(state => state[`${payload.name}`][`${focus.listName}`])
      if (focusList.length == 0) {
        const { data } = yield getList({
          category: focus.category,
          tag: focus.tag,
          label: focus.label,
          page: 1
        })
        data.data.map((item) => {
          item.time = item.date.slice(0, 10)
        })
        if (data.status == 200) {
          yield put({
            type: 'Get',
            payload: {
              data: data.data,
              focus: payload.index
            }
          })
        }
      } else {
        yield put({
          type: 'Change',
          payload: {
            focus: payload.index
          }
        })
      }
    },
    *loadMore({ payload }, { put, select }) { // 上拉加载
      const { title, focus } = yield select(state => state[`${payload.nameSpace}`])
      yield put({
        type: 'OnLoading',
        payload: {
          focus
        }
      })
      const focusData = title[focus]
      const { data, status } = yield getList({
        category: focusData.category,
        tag: focusData.tag,
        page: focusData.page + 1
      })
      if (status == 200) {
        yield put({
          type: 'LoadMore',
          payload: {
            data: data.data,
            focus
          }
        })
      }
      return {
        focusModel: title[focus]
      }
    }
  },
  reducers: {
    Change(state, action) { // 切换子模块
      const { focus } = action.payload
      state.focus = focus
      state.articleList = [...state[`${state.title[focus].listName}`]]
      return {
        ...state
      }
    },
    Refresh(state, action) { // 下拉刷新
      const { focus, data } = action.payload
      state[`${state.title[focus].listName}`] = data.concat(state[`${state.title[focus].listName}`])
      state.articleList = data.concat(state.articleList)
      return {
        ...state,
      }
    },
    Get(state, action) { // 获取数据
      const { focus, data } = action.payload
      state.focus = focus
      state[`${state.title[focus].listName}`] = [...data]
      state.articleList = [...state[`${state.title[focus].listName}`]]
      return {
        ...state,
      }
    },
    LoadMore(state, action) { // 加载更多
      const { data, focus } = action.payload
      state.title[focus].page += 1
      if (data.length == 0) {
        state.title[focus].isLoad = 2
      } else {
        state[`${state.title[focus].listName}`] = state[`${state.title[focus].listName}`].concat(data)
        state.articleList = state[`${state.title[focus].listName}`]
        state.title[focus].isLoad = 0
      }
      return {
        ...state,
      }
    },
    OnLoading(state, action) { // 切换加载状态
      const { focus } = action.payload
      console.log('change')
      state.title[focus].isLoad = 1
      return {
        ...state
      }
    }
  }
}