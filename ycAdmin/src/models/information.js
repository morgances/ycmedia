import { submitInformation } from "@/services/information";

export default {
  namespace: "information",

  state: {
    information: {}
  },

  effects: {
    *fetchInformation({ payload }, { call, put }) {
      const response = yield call(submitInformation, payload);
      console.log(response, "aaaaaaaaaaa");
      if (response.status === 0) {
        yield put({
          type: "changeInformation",
          payload: response.data
        });
      } else {
        yield put({
          type: "changeInformation",
          payload: "nothing"
        });
      }
      return response.data;
    }
  },

  reducers: {
    changeInformation(state, { payload }) {
      return {
        ...state,
        information: payload
      };
    }
  }
};
