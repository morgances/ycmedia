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
      console.log(response, "response")
      const { status } = response;

      if ((status !== undefined) && (status === 0)){
        return setToken(response.data)
      }
      console.log(setToken(response.data))
      if (response.status === 200) {
        window.location.href = "http://localhost:8000/list/basic-list";
        return;
      }
    }
      // Login successfully
      //   reloadAuthorized();
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let { redirect } = params;
      //   if (redirect) {
      //     const redirectUrlParams = new URL(redirect);
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf("#") + 1);
      //       }
      //     } else {
      //       window.location.href = redirect;
      //       return;
      //     }
      //   }
      //   yield put(routerRedux.replace(redirect || "/"));
      // }
    // },

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
