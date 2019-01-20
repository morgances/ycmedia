import { queryRule, removeRule, addRule, updateRule } from "@/services/api";

export default {
  namespace: "rule",

  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      console.log(response, 'response')
      yield put({
        type: "save",
        payload: response.data
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    }
  },

  reducers: {
    save(state, action) {
      console.log(action.payload)
      return {
        ...state,
        data: action.payload
      };
    }
  }
};
