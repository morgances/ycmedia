import { query as queryUsers, queryCurrent } from "@/services/user";

export default {
  namespace: "user",

  state: {
    list: [],
    currentUser: {},
  },
  // state: {
  //   list: [],
  //   currentUser: {
  //     name: 'Oiar',
  //     avatar: 'http://pic1.win4000.com/wallpaper/3/55b1f8304d0c7.jpg',
  //     userid: '00000001',
  //   }
  // },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: "save",
        payload: response
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: "saveCurrentUser",
        payload: response
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
