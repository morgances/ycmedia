import {
  queryFakeList,
  removeList,
  addList,
  updateFakeList
} from "@/services/api";

export default {
  namespace: "list",

  state: {
    list: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      console.log(response, 'response')
      yield put({
        type: "queryList",
        payload: response.data
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: "appendList",
        payload: Array.isArray(response) ? response : []
      });
    },
    // *submit({ payload }, { call, put }) {
    //   let callback;
    //   if (payload.id) {
    //     callback =
    //       Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
    //   } else {
    //     callback = addFakeList;
    //   }
    //   const response = yield call(callback, payload); // post
    //   yield put({
    //     type: "queryList",
    //     payload: response
    //   });
    // },
    *addList({ payload }, { call, put }) {
      const response = yield call(addList, payload);
      if(response.status !== 0) {
        return false
      } else {
        const addResponse = yield call(queryFakeList, payload);
        if (addResponse.status !== 0) {
          return
        }
        yield put({
          type: 'addList',
          payload: addResponse.data,
        });
      }
    },
    *removeList({ payload }, { call,put }) {
      const response = yield call(removeList, payload);
      if (response.status === 0) {
        const response = yield call(queryFakeList, payload);
        if (response.status !== 0) {
          return
        }
        yield put({
          type: 'removeList',
          payload: response.data,
        });
      } else {
        return false
      }
    },
  },

  reducers: {
    queryList(state, action) {
      console.log(action.payload)
      return {
        ...state,
        list: action.payload
      };
    },
    addList(state, { payload }) {
      console.log('添加后', payload)
      return {
        ...state,
        list: payload,
      };
    },
    removeList(state, { payload }) {
      console.log('删除后', payload)
      return {
        ...state,
        list: payload,
      }
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload)
      };
    }
  }
};
