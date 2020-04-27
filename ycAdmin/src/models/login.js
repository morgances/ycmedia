import { routerRedux } from "dva/router";
import { stringify } from "qs";
import { AccountLogin, getFakeCaptcha } from "@/services/api";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";
import { reloadAuthorized } from "@/utils/Authorized";
import { setToken } from "../services/token";

export default {
  namespace: "login",

  state: {
    status: undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      yield put({
        type: "changeLoginStatus",
        payload: {
          status: true
        }
      });
      const { status } = response;

      if ((status !== undefined) && (status === 0)){
        return setToken(response.data)
      }
      if (response.status === 200) {
        window.location.href = "http://localhost:8000/article/article-list";
        return;
      }
    }

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    // *logout(_, { put }) {
    //   yield put({
    //     type: "changeLoginStatus",
    //     payload: {
    //       status: false,
    //       currentAuthority: "guest"
    //     }
    //   });
    //   reloadAuthorized();
    //   yield put(
    //     routerRedux.push({
    //       pathname: "/user/login",
    //       search: stringify({
    //         redirect: window.location.href
    //       })
    //     })
    //   );
    // }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      //setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
      };
    }
  }
};
