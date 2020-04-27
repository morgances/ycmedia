import {
  addPicture,
  queryPictureList,
  removePicture,
  getPicture,
  updatePicture,
  uploadPicture
} from "@/services/api";
import router from "umi/router";

export default {
  namespace: "list",
  state: {
    data: {},
    list: []
  },

  effects: {
    *queryPictureList({ payload }, { call, put }) {
      const response = yield call(queryPictureList, payload);
      if (response.status !== 0) {
        return
      }
      yield put({
        type: "queryPictureList",
        payload: response
      });
    },
    *addPicture({ payload }, { call, put }) {
      let callback;
      if(payload.BannerId) {
        callback = updatePicture;
      } else {
        callback = addPicture;
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
    *removePicture({ payload, callback }, { call, put }) {
      const response = yield call(removePicture, payload);
      //更新删除后数据
      if (response.status === 0) {
        const response = yield call(queryPictureList, payload);
        yield put({
          type: "queryPictureList",
          payload: response
        });
      }
    },
    *getPicture({ payload }, { call, put }) {
      const response = yield call(getPicture, payload);
      yield put({
        type: "edictPicture",
        payload: response.data
      })
    },
    *uploadPicture({ payload }, { call, put }) {
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
    queryPictureList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
    uploadPicture(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    },
  }
};
