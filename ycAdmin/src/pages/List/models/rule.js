import { getArticleList, removeArticle, removeBanner, addArticle, getText, getPicture, getPictureList } from "@/services/api";
import { routerRedux } from 'dva/router'

export default {
  namespace: "rule",

  state: {
    data: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: "save",
        payload: response
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addArticle, payload);
      yield put({
        type: "addRule",
        payload: response.data
      });
      if (callback) callback();
    },
    *removeText({ payload }, { call, put }) {
      const response = yield call(removeArticle, payload);
      if(response.status === 200) {
        const res = yield call(getArticleList, payload);
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
    *picture({ payload }, { call, put }) {
      const response = yield call(getPicture, payload);
      yield put({
        type: "edictPicture",
        payload: response.data
      })
    }
  },
  *removePicture({ payload, callback }, { call, put }) {
    const response = yield call(removeBanner, payload);
    //更新删除后数据
    if (response.status === 200) {
      const response = yield call(getPictureList, payload);
      yield put({
        type: "savePicture",
        payload: response
      });
    }
    if (callback) callback();
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    savePicture(state, { payload }) {
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
    edictPicture(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    addRule(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
  }
};
