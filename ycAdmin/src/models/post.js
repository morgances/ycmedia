import { fetchPost, passPost, noPassPost } from "@/services/post";

export default {
  namespace: "post",

  state: {
    post: []
  },

  effects: {
    *fetchPost({ payload }, { call, put }) {
      const response = yield call(fetchPost, payload);
      if (response.status === 0) {
        yield put({
          type: "readInformation",
          payload: response
        });
      }
    },

    *passPost({ payload }, { call, put }) {
      console.log(`payload: ${JSON.stringify(payload)}`);
      const response = yield call(passPost, payload);
      if (response.status === 0) {
        const resp = yield call(fetchPost);
        if (resp.status === 0) {
          yield put({
            type: "readInformation",
            payload: resp
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    *noPassPost({ payload }, { call, put }) {
      const response = yield call(noPassPost, payload);
      if (response.status === 0) {
        const resp = yield call(fetchPost);
        if (resp.status === 0) {
          yield put({
            type: "readInformation",
            payload: resp
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },

  reducers: {
    readInformation(state, { payload }) {
      console.log(">>>>>========", payload);
      return {
        ...state,
        post: [...payload.data]
      };
    }
  }
};
