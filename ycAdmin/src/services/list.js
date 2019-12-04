import request from "@/utils/request";
import { getToken } from "./token";

// GET 获取
export async function queryList() {
  let resp = await request("/matchmaking/goods/byprice", {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });
  return resp;
}

// POST 添加
export async function addList(params) {
  let formData = new FormData();
  formData.append("title", params.title);
  formData.append("price", params.price);
  formData.append("description", params.description);
  let resp = await request(`/matchmaking/goods/create`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken()
    },
    body: formData
  });
  return resp;
}

export async function removeList(params) {
  return await request(`/matchmaking/goods/delete`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken()
    },
    body: {
      ...params,
      method: "post"
    }
  });
}