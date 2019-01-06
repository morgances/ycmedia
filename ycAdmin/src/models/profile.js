import {
  fetchProfile,
  successProfile,
  failureProfile
} from "@/services/profile";

export default {
  namespace: "profile",

  state: {
    basicGoods: []
  },

  effects: {
    *fetchProfile(_, { call, put }) {
      const response = yield call(fetchProfile);
      console.log("收到的数据：", response);
      if (response.status !== 0) {
        return;
      }
      yield put({
        type: "profileInformation",
        payload: response.data
      });
    },

    *successProfile({ payload }, { call, put }) {
      console.log("点击确认后收到的数据：", payload);
      const response = yield call(successProfile, payload);
      if (response.status === 0) {
        const response = yield call(fetchProfile);
        console.log("再次获取收到的数据：", response);
        if (response.status !== 0) {
          return;
        }
        yield put({
          type: "profileInformation",
          payload: response.data
        });
      }
    },

    *failureProfile({ payload }, { call, put }) {
      console.log("点击确认后收到的数据：", payload);
      const resp = yield call(failureProfile, payload);
      if (response.status === 0) {
        const response = yield call(fetchProfile);
        console.log("再次获取收到的数据：", response);
        if (response.status !== 0) {
          return;
        }
        yield put({
          type: "profileInformation",
          payload: resp.data
        });
      }
    }
  },

  reducers: {
    profileInformation(state, { payload }) {
      console.log("转换成列表：", payload);
      return {
        ...state,
        basicGoods: payload
      };
    }
  }
};
