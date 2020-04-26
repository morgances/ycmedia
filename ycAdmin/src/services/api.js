import request from "@/utils/request";
import { async } from "q";

export async function AccountLogin(params) {
  return request("/api/v1/admin/login", {
    method: "POST",
    body: {
      ...params
    }
  });
}

export async function addArticle(params) {
  return request("/api/v1/article/add", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

export async function removeArticle(params) {
  return request("/api/v1/article/delete", {
    method: "POST",
    body: {
      ...params,
      method: "delete"
    }
  });
}

export async function getText(params) {
  return request("/api/v1/article/gettext",{
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  })
}

export async function updateAritcleList(params) {
  return request("/api/v1/article/update", {
    method: "POST",
    body: {
      ...params
    }
  });
}

export async function queryArticleList(params) {
  return request("/api/v1/article/getall", {
    method: "POST",
    body: {
      ...params,
    }
  });
}

export async function removeBanner(params) {
  return request("/api/v1/banner/delete", {
    method: "POST",
    body: {
      ...params,
      method: "delete"
    }
  });
}

export async function getPicture(params) {
  return request("/api/v1/banner/detail", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  })
}

export async function queryPictureList(params) {
  return request("/api/v1/banner/all", {
    method: "POST",
    body: {
      ...params,
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

export async function updatePicture(params) {
  return request("/api/v1/banner/update", {
    method: "POST",
    body: {
      ...params
    }
  });
}


export async function uploadPicture(params) {
  console.log(params, "params")
  return request("/api/v1/upload", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  })
}
