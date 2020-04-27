import { 
  addArticle,
  queryArticleList, 
  removeArticle, 
  getArticle,
  updateAritcle
} from "@/services/api";
import { routerRedux } from 'dva/router'

export default {
  namespace: "rule",

  state: {
    data: {},
    list: []
  },

  effects: {
    *queryArticleList({ payload }, { call, put }) {
      const response = yield call(queryArticleList, payload);
      yield put({
        type: "save",
        payload: response
      });
    },
    *addArticle({ payload }, { call, put }) {
      const response = yield call(addArticle, payload);
      if(response === undefined) {
        router.push("/exception/500")
      }
      if(response.status != 200) {
        return false
      } else {
        const addResponse = yield call(queryArticleList, payload);
        if (addResponse.status != 200) {
          return false
        }
        yield put({
          type: 'queryArticleList',
          payload: addResponse.data,
        });
      }
    },
    *removeArticle({ payload }, { call, put }) {
      const response = yield call(removeArticle, payload);
      if(response.status === 200) {
        const res = yield call(queryArticleList, payload);
        yield put({
          type: 'save',
          payload: res,
        })
      }
    },
    *updateArticle({ payload }, { call, put }) {
      const response = yield call(updateAritcle, payload);
      if (response.status !== 0) {
        return
      }
      yield put({
        type: "updateArticle",
        payload: response.data
      })
    },
    *getArticle({ payload }, { call, put }) {
      const response = yield call(getArticle, payload);
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
    queryArticleList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
    updateArticle(state, { payload }) {
      return {
        ...state,
        list: payload,
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
