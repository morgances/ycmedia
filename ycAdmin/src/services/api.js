//import { stringify } from "qs";
import request from "@/utils/request";
import { setToken } from "./token";

// export async function queryProjectNotice() {
//   return request("/api/project/notice");
// }

// export async function queryActivities() {
//   return request("/api/activities");
// }

export async function queryRule(params) {
  console.log(params,'')
  return request("/api/v1/article/getlist", {
    method: "POST",
    body: {
      ...params,
    }
  });
}

export async function removeRule(params) {
  return request("/api/v1/article/delete", {
    method: "POST",
    body: {
      ...params,
      method: "delete"
    }
  });
}

export async function addRule(params) {
  return request("/api/v1/article/add", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

export async function getText(params) {
  console.log(params,"获取参数")
  return request("/api/v1/article/gettext",{
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  })
}

// export async function updateRule(params) {
//   return request("/api/rule", {
//     method: "POST",
//     body: {
//       ...params,
//       method: "update"
//     }
//   });
// }

// export async function fakeSubmitForm(params) {
//   return request("/api/forms", {
//     method: "POST",
//     body: params
//   });
// }

// export async function fakeChartData() {
//   return request("/api/fake_chart_data");
// }

export async function queryTags() {
  return request("/api/tags");
}

// export async function queryBasicProfile() {
//   return request("/api/profile/basic");
// }

// export async function queryAdvancedProfile() {
//   return request("/api/profile/advanced");
// }

export async function queryFakeList(params) {
  return request("/api/v1/article/getlist", {
    method: "POST",
    body: {
      ...params,
    }
  });
}

export async function queryPictureList(params) {
  console.log(params,'请求图片列表参数')
  return request("/api/v1/banner/list", {
    method: "POST",
    body: {
      ...params,
    }
  });
}

export async function removeList(params) {
  //const { count = 5, ...restParams } = params;
  return await request(`/api/v1/article/delete`, {
    method: "POST",
    body: {
      ...params,
      method: "delete"
    }
  });
}

export async function addList(params) {
  console.log(params,'请求添加文章参数')
  return request("/api/v1/article/add", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

export async function addPictureList(params) {
  return request("/api/v1/banner/create", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

export async function updateFakeList(params) {
  console.log(params)
  return request("/api/v1/article/update", {
    method: "POST",
    body: {
      ...params
    }
  });
}

export async function fakeAccountLogin(params) {
  //let resp = await request("/api/v1/admin/login", {
  return request("/api/v1/admin/login", {
    method: "POST",
    body: {
      ...params
    }
  });

  // const { status } = resp;

  // if ((status !== undefined) && (status === 0)){
  //   setToken(resp.data.token)
  //   return true
  // }
  // return false;
}

// export async function fakeRegister(params) {
//   return request("/api/register", {
//     method: "POST",
//     body: params
//   });
// }

// export async function queryNotices() {
//   return request("/api/notices");
// }

export async function getFakeCaptcha(params) {
  return request("/api/v1/admin/login", {
    method: "POST",
    body: params
  });
}

export async function queryCurrent() {
  return request('/api/currentUser');
}