export default {
  namespace: 'theme',
  state: {
    theme: {}
  },
  effects: {
    *set({ payload }, { put }) {
      yield put({
        type: 'Set',
        payload:  payload.theme
      })
    }
  },
  reducers: {
    Set(state, action) {
      return {
        ...state,
        theme: action.payload
      }
    }
  }
}