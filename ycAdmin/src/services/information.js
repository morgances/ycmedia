import request from "@/utils/request";
import { getToken } from "./token";

export async function submitInformation(params) {
  let resp = await request("/matchmaking/user/getuserdetail", {
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
