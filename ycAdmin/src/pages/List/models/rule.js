import { queryRule, removeRule, addRule, updateRule, getText } from "@/services/api";

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
        type: "addRule",
        payload: response.data
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
    },
    *gettext({ payload, callback }, { call, put }) {
      const response = yield call(getText, payload);
      yield put({
        type: "save",
        payload: response
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload)
      return {
        ...state,
        data: action.payload
      };
    },
    addRule(state, { payload }) {
      console.log('添加后', payload)
      return {
        ...state,
        data: payload,
      };
    },
  }
};
