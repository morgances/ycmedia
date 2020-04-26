import { 
  queryArticleList, 
  removeArticle, 
  getText, 
} from "@/services/api";
import { routerRedux } from 'dva/router'

export default {
  namespace: "rule",

  state: {
    data: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      yield put({
        type: "save",
        payload: response
      });
    },
    *removeText({ payload }, { call, put }) {
      const response = yield call(removeArticle, payload);
      if(response.status === 200) {
        const res = yield call(queryArticleList, payload);
        yield put({
          type: 'save',
          payload: res,
        })
      }
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
      return {
        ...state,
        data: payload[0]
      };
    },
  }
};
