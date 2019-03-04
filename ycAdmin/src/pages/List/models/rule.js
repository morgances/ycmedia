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
    // *fetchPicture({ payload }, { call, put }) {
    //   const response = yield call(queryPictureList, payload);
    //   console.log(response, 'response')
    //   yield put({
    //     type: "savePicture",
    //     payload: response.data
    //   });
    // },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addArticle, payload);
      yield put({
        type: "addRule",
        payload: response.data
      });
      if (callback) callback();
    },
    *removeText({ payload, callback }, { call, put }) {
      const response = yield call(removeArticle, payload);
      console.log(response,"文章response")
      //更新删除后数据
      if (response.status === 200) {
        const response = yield call(getArticleList, payload);
        yield put({
          type: "save",
          payload: response
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
    *picture({ payload }, { call, put }) {
      console.log(response)
      const response = yield call(getPicture, payload);
      yield put({
        type: "edictPicture",
        payload: response.data
      })
    }
  },
  *removePicture({ payload, callback }, { call, put }) {
    const response = yield call(removeBanner, payload);
    console.log(response,"删除response")
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
      console.log(payload,'获取列表')
      return {
        ...state,
        data: payload
      };
    },
    savePicture(state, { payload }) {
      console.log(state,'数据state')
      console.log(payload,'获取图片列表')
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
    edictPicture(state, { payload }) {
      console.log(payload,"编辑图片")
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
