import request from "@/utils/request";
import { getToken } from "./token";

export async function fetchProfile() {
  let resp = await request("/matchmaking/trade/unfinished", {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  });
  return resp;
}

export async function successProfile(params) {
  let resp = await request("/matchmaking/trade/updatestatus", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken()
    },
    body: {
      ...params,
      method: "post"
    }
  });
  const { status } = resp;

  if (status !== 0) return false;

  return resp;
}

export async function failureProfile(params) {
  let resp = await request("/matchmaking/trade/cancel", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + getToken()
    },
    body: {
      ...params,
      method: "post"
    }
  });
  const { status } = resp;

  if (status !== 0) return false;

  return resp;
}
