import {
  queryArticleList,
  addArticle,
  updateAritcleList,
  addPictureList,
  queryPictureList,
  removeBanner,
  getPicture,
  updatePicture,
  uploadPicture
} from "@/services/api";
import router from "umi/router";

export default {
  namespace: "list",
  state: {
    list: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPictureList, payload);
      if (response.status !== 0) {
        return
      }
      yield put({
        type: "queryPictureList",
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
          type: 'queryPictureList',
          payload: addResponse.data,
        });
      }
    },
    *addPictureList({ payload }, { call, put }) {
      let callback;
      if(payload.BannerId) {
        callback = updatePicture;
      } else {
        callback = addPictureList;
      }
      const response = yield call(callback, payload);
      if(response === undefined) {
        router.push("/exception/500")
      }
      yield put({
        type: 'queryPictureList',
        payload: response,
      })
    },
    *updateArticle({ payload }, { call, put }) {
      const response = yield call(updateAritcleList, payload);
      if (response.status !== 0) {
        return
      }
      yield put({
        type: "updateArticle",
        payload: response.data
      })
    },
    *removePicture({ payload, callback }, { call, put }) {
      const response = yield call(removeBanner, payload);
      //更新删除后数据
      if (response.status === 0) {
        const response = yield call(queryPictureList, payload);
        yield put({
          type: "queryPictureList",
          payload: response
        });
      }
    },
    *picture({ payload }, { call, put }) {
      const response = yield call(getPicture, payload);
      yield put({
        type: "edictPicture",
        payload: response.data
      })
    },
    *upload({ payload }, { call, put }) {
      const response = yield call(uploadPicture, payload);
      yield put({
        type: "uploadPicture",
        payload: response
      })
    }
  },

  reducers: {
    edictPicture(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    savePicture(state, { payload }) {
      return {
        ...state,
        data: payload
      };
    },
    queryPictureList(state, { payload }) {
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
    addArticle(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    addPictureList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    removeList(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    },
    uploadPicture(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    },
  }
};
