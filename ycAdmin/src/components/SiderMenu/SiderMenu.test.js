import { urlToList } from "../_utils/pathTools";
import { getFlatMenuKeys, getMenuMatchKeys } from "./SiderMenu";

const menu = [
  {
    path: "/homePage",
    children: [
      {
        path: "/homePage/name"
      }
    ]
  },
  {
    path: "/userinfo",
    children: [
      {
        path: "/userinfo/:id",
        children: [
          {
            path: "/userinfo/:id/info"
          }
        ]
      }
    ]
  }
];

const flatMenuKeys = getFlatMenuKeys(menu);

describe("test convert nested menu to flat menu", () => {
  it("simple menu", () => {
    expect(flatMenuKeys).toEqual([
      "/homePage",
      "/homePage/name",
      "/userinfo",
      "/userinfo/:id",
      "/userinfo/:id/info"
    ]);
  });
});

describe("test menu match", () => {
  it("simple path", () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList("/homePage"))).toEqual([
      "/homePage"
    ]);
  });

  it("error path", () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList("/homePage"))).toEqual([]);
  });

  it("Secondary path", () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList("/homePage/name"))).toEqual(
      ["/homePage", "/homePage/name"]
    );
  });

  it("Parameter path", () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList("/userinfo/2144"))).toEqual(
      ["/userinfo", "/userinfo/:id"]
    );
  });

  it("three parameter path", () => {
    expect(
      getMenuMatchKeys(flatMenuKeys, urlToList("/userinfo/2144/info"))
    ).toEqual(["/userinfo", "/userinfo/:id", "/userinfo/:id/info"]);
  });
});
