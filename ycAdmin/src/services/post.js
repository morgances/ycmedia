import request from "@/utils/request";
import { getToken } from "./token";

export async function fetchPost() {
  let resp = await request("/matchmaking/post/unreviewedpost", {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });
  return resp;
}

export async function passPost(params) {
  console.log(`params: ${JSON.stringify(params)}`);
  return await request(`/matchmaking/post/updatestatus`, {
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

export async function noPassPost(params) {
  console.log(`params: ${JSON.stringify(params)}`);
  return await request(`/matchmaking/post/admindelete`, {
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
