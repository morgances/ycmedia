import { queryRule, removeRule, addRule, updateRule, getText, queryFakeList } from "@/services/api";

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
      console.log(response,'8')
      //更新删除后数据
      if (response.status === 200) {
        const response = yield call(queryRule, payload);
        yield put({
          type: "save",
          payload: response.data
        });
      }
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
    *text({ payload }, { call, put }) {
      const response = yield call(getText, payload);
      yield put({
        type: "edict",
        payload: response.data
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    edict(state, { payload }) {
      console.log(payload,'编辑')
      return {
        ...state,
        data: payload
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
