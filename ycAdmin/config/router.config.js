export default [
  // user
  {
    path: "/user",
    component: "../layouts/UserLayout",
    routes: [
      { path: "/user", redirect: "/user/login" },
      { path: "/user/login", component: "./User/Login" },
      // { path: "/user/register", component: "./User/Register" },
      // { path: "/user/register-result", component: "./User/RegisterResult" }
    ]
  },

  // app
  {
    path: "/",
    component: "../layouts/BasicLayout",
    Routes: ["src/pages/Authorized"],
    routes: [
      {
        name: "account",
        icon: "user",
        path: "/account",
        hideInMenu: true,
        routes: [
          {
            path: "/account/center",
            name: "center",
            component: "./Account/Center/Center",
            hideInMenu: true,
            routes: [
              {
                path: "/account/center",
                redirect: "/account/center/articles"
              },
              {
                path: "/account/center/articles",
                component: "./Account/Center/Articles"
              },
              {
                path: "/account/center/applications",
                component: "./Account/Center/Applications"
              },
              {
                path: "/account/center/projects",
                component: "./Account/Center/Projects"
              }
            ]
          },
          {
            path: "/account/settings",
            name: "settings",
            component: "./Account/Settings/Info",
            hideInMenu: true,
            routes: [
              {
                path: "/account/settings",
                redirect: "/account/settings/base"
              },
              {
                path: "/account/settings/base",
                component: "./Account/Settings/BaseView"
              },
              {
                path: "/account/settings/security",
                component: "./Account/Settings/SecurityView"
              },
              {
                path: "/account/settings/binding",
                component: "./Account/Settings/BindingView"
              },
              {
                path: "/account/settings/notification",
                component: "./Account/Settings/NotificationView"
              }
            ]
          }
        ]
      },

      // list
      { path: '/', redirect: '/user/login' },
      {
        path: "/list",
        icon: "file-text",
        name: "list",
        routes: [
          {
            path: "/list/basic-list",
            name: "basiclist",
            component: "./List/BasicList"
          },
          {
            path:"/list/adding-list",
            name: "addinglist",
            component: "./List/AddText",
            hideInMenu: true
          },
          {
            path: "/list/adding-list/:aid",
            name: "addinglistaid",
            component: "./List/Adding",
            hideInMenu: true
          }
        ]
      },

      // post
      {
        path: "/post",
        icon: "picture",
        name: "post",
        routes: [
          {
            path: "/post/dynamic-post",
            name: "dynamicpost",
            component: "./Post/DynamicPost"
          }
        ]
      },

      // profile
      // {
      //   path: "/profile",
      //   name: "profile",
      //   icon: "audit",
      //   routes: [
      //     {
      //       path: "/profile/basic",
      //       name: "basic",
      //       component: "./Profile/BasicProfile"
      //     }
      //   ]
      // },

      // exception
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
            hideInMenu: true,
          },
        ],
      },
      {
        component: "404"
      }
    ]
  }
];
